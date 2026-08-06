import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB connected succesfully on the port 5000 !");
  } catch (err) {
    console.log("MongoDB connection failed !! ");
  }
};
export default connectdb;
