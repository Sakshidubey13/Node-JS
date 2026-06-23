// step 1. import & connect mongodb server
import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017"; // MongoDB connection URL
const db_name = "studentDB"; // Database name
const client = new MongoClient(url);

//step 2  Create a Reusable DB Connection Function
const connectDB = async () => {
  await client.connect();
  console.log("MongoDB Connected Successfully");
  return client.db(db_name); //return a database reference
};

// database --> collection --> document --> key-value // this is flow of mongodb

const addStudent = async () => {
  const db = await connectDB();
};


//step 3 CURD operation perform
//C-CReate
