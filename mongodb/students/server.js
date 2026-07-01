//step 1 : Import and connect to MongoDB
import { MongoClient } from "mongodb"; //import mongoclient
const url = "mongodb://127.0.0.1:27017"; //mongodb connection url
const dbname = "student-db"; //DataBase name
const client = new MongoClient(url);

//step 2 : Create a Reusable DB Connection Function
const connectDB = async () => {
  await client.connect(); //its connect server with database
  console.log("Mongodb connected susseccfully !! ");
  return client.db(dbname); //create database and return db object
};

// flow of mongodb
//database --> collection --> document(file) --> key : value

//CRUD operation using MongoDB Driver
//1. Create
const addStudent = async () => {
  const db = await connectDB();
  const result = await db.collection("all-students").insertOne({
    name: "yashika",
    course: "Web Development",
    age: 18,
    //result: 80.92,
  });
  console.log("student added successfully !!", result);
};

//addStudent();//call function

//2. Read
// get all users
const getStudent = async () => {
  const db = await connectDB();
  const result = await db.collection("all-students").find().toArray();
  console.log("Student fetched Successfully !!", result);
};
//getStudent()

//3. Update
const updateStudent = async () => {
  const db = await connectDB();
};
