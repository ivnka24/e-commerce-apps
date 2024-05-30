import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
// console.log(process.env,' <<<< env');

if (!uri) {
  throw new Error("mongo uri is not found!");
}

let client: MongoClient;

export const getMongoClientInstance = async (): Promise<MongoClient> => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
};
