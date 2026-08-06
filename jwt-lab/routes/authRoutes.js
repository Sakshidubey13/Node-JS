import express from 'express'
import { getprofile, signIn, signUp } from '../controller/userController.js';
import { tokenMiddleware } from '../middleware/userMiddleware.js';


const Router = express.Router();

Router.post("/signup",signUp);
Router.post("/signin",signIn);
Router.get("/profile",tokenMiddleware, getprofile)
export default Router;