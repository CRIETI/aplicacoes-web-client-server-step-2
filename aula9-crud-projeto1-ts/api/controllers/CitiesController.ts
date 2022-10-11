import { Sequelize, Op } from 'sequelize';
import express, { Express, Request,Response } from 'express';
import CityModel from '../models/City';
import StateModel from '../models/State';

class CitiesController {

  index = async (req : Request, res : Response, next :any) => 
  {

    const cities = await CityModel.findAll(
    {
      include: [{
        model: StateModel,
        required: false,
        attributes: ['name', 'province']
      }]
    });

    res.json(cities);
  }

  create = async (req : Request, res : Response, next :any) => 
  {
    try 
    {
      const data = await this._validateData(req.body);
      const city = await CityModel.create(data);
      res.json(city);
    }
    catch (error:any) 
    {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req : Request, res : Response, next :any) => 
  {
    const state = await CityModel.findByPk(req.params.cityId);
    res.json(state);
  }

  update = async (req : Request, res : Response, next :any) => 
  {
    try 
    {
      const id = req.params.cityId;
      const data = await this._validateData(req.body);
      await CityModel.update(data,
      {
        where: {
          id: id
        }
      });

      res.json(await CityModel.findByPk(id));
    }
    catch (error:any)
    {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req : Request, res : Response, next :any) =>
  {
    await CityModel.destroy(
    {
      where: {
        id: req.params.cityId
      }
    });
    res.json({});
  }

  _validateData = async (data:any) =>
  {
    const attributes = ['name', 'StateId'];
    const city:any = {};

    for (const attribute of attributes) 
    {
      if (!data[attribute]) 
      {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      city[attribute] = data[attribute];
    }

    if (await this._checkIfCityAndStateExists(city.name, city.StateId)) 
    {
      throw new Error(`The city in the State "${city.StateId}" already exists.`);
    }

    return city;
  }

  _checkIfCityAndStateExists = async (name: string, state:string) => 
  {
    const cities = await CityModel.count(
    {
      where: 
      {
        [Op.and]: [
          { StateId: state },
          { name: name }
        ]
      }
    });

    return cities > 0;
  }

}

const citiesController =  new CitiesController();
export default citiesController