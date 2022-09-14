import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import Joi from "joi";
dotenv.config();

const app = express();

app.use(cors());
app.use(json());

const client = new MongoClient(process.env.MONGO_URI);

try {
  await client.connect();
  console.log("Mongo conectado!");
} catch (error) {
  console.log(error);
}

const db = client.db("pitchau");

app.listen(5000);
