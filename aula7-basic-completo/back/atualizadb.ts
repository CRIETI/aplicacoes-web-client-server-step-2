import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from "./sequelize";
import Usuario from "./model/Usuario";

async function atualizaDb()
{
    await Usuario.sync({force:true});
    await Usuario.create({
        nome:"Eduardo",
        senha:"12345",
        email:"trialforce@gmail.com"
    });

    let logado:any = await Usuario.localizaUsuario('trialforce@gmail.com','12345');
    console.log(logado.toJSON());
}

atualizaDb();