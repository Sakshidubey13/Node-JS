import express from "express";
import { addBook } from "../controllers/bookController.js";

const router = express.Router();
//route ==> is the way to enter into server
router.post("/", addBook);

export default router;

