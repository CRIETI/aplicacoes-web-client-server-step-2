import { db } from './config';
import { dbQuery } from './dbQuery';
console.log("Migration");

async function main()
{
    let sql : string[] = [];
    sql.push( "DROP TABLE IF EXISTS produto;");
    sql.push( `CREATE TABLE "produto" (
        "id" SERIAL,
        "nome" VARCHAR(250) NOT NULL,
        "valor" NUMERIC(10,2) NULL DEFAULT NULL
    )
    ;`);

    sql.push( "INSERT INTO produto (nome,valor) VALUES('Bola quadrada',89.56) RETURNING id;");
    sql.push( "INSERT INTO produto (nome,valor) VALUES('Bola Redonda',15.56) RETURNING id;");

    for (var i : number = 0; i< sql.length ; i++)
    {
        let mySql = sql[i];
        let result = await dbQuery(mySql);
        console.log(mySql,result);
    }

    let sql2 : string ="SELECT * FROM produto"; 
    let produtos = await dbQuery(sql2);

    console.table(produtos);
    await db.end();
}

main();


