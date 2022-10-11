import { DataTypes, Model } from 'sequelize';
import db from '../db/index';

class State extends Model 
{ 
  declare id:number;
  declare name:string;
  declare province:string;
};

State.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  province: {
    type: DataTypes.CHAR(2),
    allowNull: false
  }

}, {
  sequelize: db,
  tableName: 'states',
  modelName: 'State'
});

export default State;