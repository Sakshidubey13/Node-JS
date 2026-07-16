import express from "express";
import { addBook, getBooks, testing } from "../controllers/bookController.js";
//import { get } from "mongoose";

const router = express.Router();
//route ==> is the way to enter into server
router.post("/", addBook);
router.get("/", getBooks);
//router.get("/test/:id", testing);
router.get("/test/:action", testing); //url params -single value get from client
//mostly used in update and delete
//req.params.action

//  query



router.get("/test", testing);

export default router;
