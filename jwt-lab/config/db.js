import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/jwt-lab");
    console.log(" MongoDB connected succesfully on the port 5000 !");
  } catch (err) {
    console.log("MongoDB connection failed !! ");
  }
};
export default connectdb;
