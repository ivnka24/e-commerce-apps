import { getMongoClientInstance } from "./index";
import { DATABASE_NAME } from "./constanants";

export const runDB = async () => {
  const client = await getMongoClientInstance();
  const db = client.db(DATABASE_NAME);
  console.log('DB RUNNING');
  
  return db;
};
