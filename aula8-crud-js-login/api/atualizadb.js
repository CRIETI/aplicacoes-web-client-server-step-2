const { DataTypes, Model } = require('sequelize');
const db = require('./db');
const User = require('./models/User');

async function atualizaDb()
{
    await User.sync({force:true});
    await User.create({
        name:"Eduardo",
        password:"12345",
        email:"trialforce@gmail.com"
    });

    let logado = await User.locateUser('trialforce@gmail.com','12345');
    console.log(logado.toJSON());
}

atualizaDb();