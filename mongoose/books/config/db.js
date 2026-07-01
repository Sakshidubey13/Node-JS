import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27107/bookstore";//bookstore will become the  database name

export const connectDB = async (req, res) => {
  await mongoose.connect(url);
};

//try...catch..use

//Que how to handle exception in javasecript ==> using try and catch
//try{
//    //expected error code
//    }
//catch(err){
//    //err - > which error comes 
//
//}