import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/jwt-lab");
    console.log(" mongodb connected succesfully !");
  } catch (err) {
    console.log("mongodb connection failed !! ");
  }
};
export default connectdb;
