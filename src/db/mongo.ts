import {Collection, MongoClient } from "mongodb";
import { MONGO_URL } from "$env/static/private";

// const client = new MongoClient(MONGO_URL);

// export function start_mongo():Promise<MongoClient>{
//     console.log('starting mongo...');
//     return client.connect();
// }

// export default client.db();

export const dbConn = async ():Promise<Collection>=>{
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    const dbName = 'mydb';
    const db = client.db(dbName);
    const collection = db.collection('User');
    return collection
}