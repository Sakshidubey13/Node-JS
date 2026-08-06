import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/authRoutes.js";



const app = express();
app.use(express.json()); 
connectDB(); 
app.use("/auth", router );

app.listen(5000,()=>{
    console.log("Server started successfully !!")
})



