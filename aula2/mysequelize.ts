import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize }  from "./sequelize";
import { User }  from "./user";

async function main()
{
    await User.sync({force: true});

    let mateus : User = new User();
    mateus.firstName  = "Mateus" ;
    mateus.lastName  = "dos santos";
    mateus.birthday = null;
    await mateus.save();
    
    let eduardo : User = new User();
    eduardo.firstName  = "Eduardo" ;
    eduardo.lastName  = "Bonfandini" ;
    eduardo.birthday = '1981-06-22'
    await eduardo.save();
    
    let users = await User.findAll();

    console.log(JSON.stringify(users,null,2));
}

main();

