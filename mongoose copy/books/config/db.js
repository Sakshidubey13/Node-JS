import mongoose from "mongoose";

//const url = "mongodb://127.0.0.1:27107/bookstor"; //bookstore will become the  database name
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bookstore");
    console.log("MongoDB connected successfully !!");
  } catch (err) {
    console.log("Mongodb connection failes ! ", err);
  }
};
export default connectDB;


//try...catch..use
//Que how to handle exception in javasecript ==> using try and catch
//try{
//    //expected error code
//    }
//catch(err){
//    //err - > which error comes
//}
