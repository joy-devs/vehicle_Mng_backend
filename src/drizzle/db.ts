import "dotenv/config";
//import{drizzle} from "drizzle-orm/node-postgres";
import {drizzle} from "drizzle-orm/neon-http";
import{Client} from "pg";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
 
 
 
 
export const client = new Client({connectionString: process.env.Database_URL as string,})
 
 
 
const DatabaseUrl = process.env.Database_URL as string;
 
if (!DatabaseUrl) {
    throw new Error("DatabaseUrl not set");
}
console.log("neon client creating");
const clienter = neon(DatabaseUrl)
console.log("neon client creating");
 export const db = drizzle(clienter,{schema,logger:true});
 
const main = async () => {
 await client.connect();
 
}
 
main().catch((err)=> console.log(err));
 
//const db = drizzle(client, { schema,logger:true});
export default db;