import { Op } from 'sequelize';
import { NextFunction, Request,Response } from 'express';
import CityModel from '../models/City';
import StateModel from '../models/State';
import City from '../models/City';

class CitiesController 
{

  index = async (req : Request, res : Response, next : NextFunction) => 
  {
    const params = req.query;
    const limit:number = params.page ? parseInt(params.limit as string) : 100;
    const page:number = params.page ? parseInt(params.page as string) : 1;
    const offset:number = (page - 1) * limit;
    const sort:string = params.sort ? params.sort as string : 'id';
    const order:string = params.order ? params.order as string : 'ASC';
    const where:any= {};

    if (params.StateId) 
    {
      where.StateId = 
      {
        [Op.eq]: params.StateId
      };
    }

    const cities = await CityModel.findAll(
    {
      where: where,
      include: [{
        model: StateModel,
        required: false,
        attributes: ['name', 'province']
      }]
    });

    res.json(cities);
  }

  create = async (req : Request, res : Response, next :NextFunction) => 
  {
    try 
    {
      const city = await CityModel.build(req.body);
      const data = await this._validateData(city);
      city.save();
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
      const city = await CityModel.build(req.body);
      const data = await this._validateData(city);
      //city.save();
      await CityModel.update(data,
      {
        where: {
          id: id
        }
      });

      res.json(city);
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

  _validateData = async (data:CityModel) =>
  {
    if (!data.name)
    {
      throw new Error(`Name is required.`);
    }

    if (!data.StateId)
    {
      throw new Error(`StateId is required.`);
    }

    /*if (await this._checkIfCityAndStateExists(data.name, data.StateId)) 
    {
      throw new Error(`The city in the State "${data.StateId}" already exists.`);
    }*/

    return data;
  }

  _checkIfCityAndStateExists = async (name: string, state:number) => 
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

export default  new CitiesController()