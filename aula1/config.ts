import { Client } from 'pg';
console.log("config");

export const db : Client = new Client(
{
    user:"postgres",
    password: "Dungo022",
    host: "localhost",
    port: 5432,
    database: "curso"
});

db.connect();
