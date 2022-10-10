const { Op } = require('sequelize');
const CityModel = require('../models/City');
const StateModel = require('../models/State');

class CitiesController {

  index = async (req, res, next) => {

    const cities = await CityModel.findAll({
      include: [{
        model: StateModel,
        required: false,
        attributes: ['name', 'province']
      }]
    });

    res.json(cities);
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const city = await CityModel.create(data);
      res.json(city);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const state = await CityModel.findByPk(req.params.cityId);
    res.json(state);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.cityId;
      const data = await this._validateData(req.body);
      await CityModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await CityModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await CityModel.destroy({
      where: {
        id: req.params.cityId
      }
    });
    res.json({});
  }

  _validateData = async (data) => {
    const attributes = ['name', 'StateId'];
    const city = {};
    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      city[attribute] = data[attribute];
    }

    if (await this._checkIfCityAndStateExists(city.name, city.StateId)) {
      throw new Error(`The city in the State "${city.StateId}" already exists.`);
    }

    return city;
  }

  _checkIfCityAndStateExists = async (name, state) => {
    const cities = await CityModel.count({
      where: {
        [Op.and]: [
          { StateId: state },
          { name: name }
        ]
      }
    });

    return cities > 0;
  }

}

module.exports = new CitiesController();
