const { DataTypes, Model } = require('sequelize');
const db = require('../db');
const State = require('./State');

class City extends Model { };

City.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }//,
  // state_id: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: State,
  //     key: 'id'
  //   }
  // }
}, {
  sequelize: db,
  tableName: 'cities',
  modelName: 'City'
});

// Doc: https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many-relationships
State.hasMany(City);
City.belongsTo(State);

module.exports = City;
