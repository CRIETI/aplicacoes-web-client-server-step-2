import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('curso', 'postgres','Dungo022',{
    dialect: "postgres",
    host: "localhost",
    port: 5432,
})