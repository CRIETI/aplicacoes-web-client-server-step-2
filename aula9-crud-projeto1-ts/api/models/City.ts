import { DataTypes, Model } from 'sequelize';
import db from '../db/index';
import State from './State';

class City extends Model 
{
  declare id:number;
  declare name:string;
  declare stateId:number;
};

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
  }
}, 
{
  sequelize: db,
  tableName: 'cities',
  modelName: 'City'
});

// Doc: https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many-relationships
State.hasMany(City);
City.belongsTo(State);

export default City;