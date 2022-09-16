import { db } from './config';

export async function dbQuery(sql : string, param? : string[])
{
    let response = await db.query(sql,param);
    return response.rows;
}