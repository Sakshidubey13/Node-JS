import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/bookRoute.js";

const app = express();
//whenever you want to work with json data , writ this line app.use(express.json())
app.use(express.json()); //midleware -> its validate request before sending to the server
connectDB(); //connect server with database == database start/on
app.use("/api/book", router);

app.listen(5000,()=>{
    console.log("Server started successfully !!")
})



