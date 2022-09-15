import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

try {
  await client.connect();
  console.log("Mongo conectado!");
} catch (error) {
  console.log(error);
}

const db = client.db("pitchau");

export default db;
