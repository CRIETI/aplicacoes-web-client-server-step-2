const { Op } = require('sequelize');
const StateModel = require('../models/State');

class StatesController {

  index = async (req, res, next) => {
    const states = await StateModel.findAll({});
    res.json(states);
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const state = await StateModel.create(data);
      res.json(state);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const state = await StateModel.findByPk(req.params.stateId);
    res.json(state);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.stateId;
      const data = await this._validateData(req.body, id);
      await StateModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await StateModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await StateModel.destroy({
      where: {
        id: req.params.stateId
      }
    });
    res.json({});
  }

  _validateData = async (data) => {
    const attributes = ['name', 'province'];
    const state = {};
    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      state[attribute] = data[attribute];
    }

    return state;
  }

}

module.exports = new StatesController();
