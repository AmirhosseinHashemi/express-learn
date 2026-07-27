import db from "./database.js";
import mapDatabaseError from "./databaseErrorMapper.js";

export default async function query(query, values) {
  try {
    return await db.query(query, values);
  } catch (error) {
    console.log(error);
    
    throw mapDatabaseError(error);
  }
}
