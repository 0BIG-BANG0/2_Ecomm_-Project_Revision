import express from "express";
import  UserController  from "./user.controller.js";

//initialize express Router
const userRouter = express.Router();

// initialize the product controller
const userController = new UserController();

userRouter.post("/signup",userController.signUp)
userRouter.post("/signin",userController.signIn)

export default userRouter;
