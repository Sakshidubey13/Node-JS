import express from 'express'
import cookieParser from 'cookie-parser';
import connectdb from './config/db.js';
import Router from './routes/authRoutes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/auth",Router);
connectdb();

app.listen(3500,()=>{
    console.log("server started successfully !!");
})