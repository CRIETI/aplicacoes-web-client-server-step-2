import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize }  from "./sequelize";

export class User extends Model 
{
    declare firstName : string;
    declare lastName : string;
    declare birthday : string | null;

    getFullname() 
    {
        return [this.firstName, this.lastName].join(' ');
    }
}

User.init(
{
  firstName: 
  {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: 
  {
    type: DataTypes.STRING,
    allowNull: true
  },
  birthday:  {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, 
{
  sequelize,
  modelName: 'User',
  freezeTableName: true,
  tableName: 'User',
  timestamps: true,
  createdAt: "criacao",
  updatedAt: 'alteracao'
});