import { DataTypes, Model } from 'sequelize';
import db from '../db/index';

export class User extends Model 
{
  declare id:number;
  declare name:string;
  declare age:string;
  declare sex:string;
  declare email:string;
};

User.init({
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
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, 
{
  sequelize: db,
  tableName: 'users',
  modelName: 'User'
});

export default User;