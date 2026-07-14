import express from "express";
import { addBook,getBooks } from "../controllers/bookController.js";
//import { get } from "mongoose";

const router = express.Router();
//route ==> is the way to enter into server
router.post("/", addBook);
router.get("/",getBooks)

export default router;

