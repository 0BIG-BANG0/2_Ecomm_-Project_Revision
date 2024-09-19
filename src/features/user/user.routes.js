import express from "express";
import  UserController  from "./user.controller.js";

//initialize express Router
const userRouter = express.Router();

// initialize the product controller
const userController = new UserController();

userRouter.post("/signup",(req,res)=>{
    userController.signUp(req,res)
})
userRouter.post("/signin",(req,res)=>{
    userController.signIn(req,res)
})

export default userRouter;
