import express from "express";
import ProductController from "../controller/product.controller.js";

//initialize express Router
const productRouter = express.Router();

// initialize the product controller
const productController = new ProductController();

productRouter.get('/',productController.getAllProducts)
productRouter.post('/',productController.addProduct)

export default productRouter;
