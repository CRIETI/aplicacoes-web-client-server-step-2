const Sequelize = require('sequelize');
export const sequelize = new Sequelize('curso', 'postgres','Dungo022',{
    dialect: "postgres",
    host: "localhost",
    port: 5432,

});

(async () => {
    try
    {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) 
    {
        console.error('Unable to connect to the database:', error);
    }
})();

export default sequelize;