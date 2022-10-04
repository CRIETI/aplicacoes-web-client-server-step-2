import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from "../sequelize";

class Usuario extends Model 
{
  declare id:number;
  declare nome:string;
  declare senha:string;
  declare email:string;

  static async localizaUsuario(email:string, senha: string)
  {
    return await Usuario.findOne({
      where: {
        email: email,
        senha: senha
      }
    });
  }
}

Usuario.init(
{
  nome: {
    type: DataTypes.STRING
  },
  senha: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  }
}, 
{
  sequelize,
  modelName: 'Usuario',
  freezeTableName: true,
  tableName: 'Usuario',
  timestamps: true,
  createdAt: 'criacao',
  updatedAt: 'alteracao'
});

export default Usuario;