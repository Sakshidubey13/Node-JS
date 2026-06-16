// step 1. import & connect mongodb server
import { MongoClient } from "mongodb";
const url = "mongodb://127.0.0.1:27017"; // MongoDB connection URL
const client = new MongoClient(url);
const dbName = "mydb"; // Database name

//step 2  Create a Reusable DB Connection Function
export const connectDB = async () => {
  await client.connect();
  console.log("MongoDB Connected ..");
  return client.db(dbName);
};

//step 3 CURD operation perform 

