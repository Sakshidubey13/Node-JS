import express from 'express'
import cookieParser from 'cookie-parser';
import connectdb from './config/db.js';
import Router from './routes/authRoutes.js';
import dotenv from 'dotenv'
const app = express();
dotenv.config()
app.use(express.json());
app.use(cookieParser());
app.use("/auth",Router);
connectdb();

app.listen(process.env.PORT,()=>{
    console.log("Server started successfully !!");
})