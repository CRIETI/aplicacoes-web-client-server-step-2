import { db } from './config';
import { dbQuery } from './dbQuery';

let sql : string ="SELECT * FROM produto"; 

async function main()
{
    let produtos = await dbQuery(sql);

    console.table(produtos);
    
    console.log("fim");

    await db.end();
}

main();


