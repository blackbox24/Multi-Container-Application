import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const MONGO_DB_URL =
  process.env.MONGO_DB_URL || "mongodb://root:example@mongo:27017/";

const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "test"

const client = new MongoClient(MONGO_DB_URL)

await client.connect();

export const db = client.db(MONGO_DB_NAME)

