import express from "express";
import { CartItemController } from "./cartItems.controller.js";


//initialize express Router
const cartRouter = express.Router();

// initialize the cart controller
const cartController = new CartItemController();

cartRouter.post('/', cartController.add)
cartRouter.get('/', cartController.get)
cartRouter.delete('/:id',cartController.delete)

export default cartRouter;
