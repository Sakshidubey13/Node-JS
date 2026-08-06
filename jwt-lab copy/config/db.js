import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/login");
    console.log("MongoDB connected successfully !!");
  } catch (err) {
    console.log("Mongodb connection failes ! ", err);
  }
};
export default connectDB;
