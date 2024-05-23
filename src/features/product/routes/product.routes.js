import express from "express";
import ProductController from "../controller/product.controller.js";
import {upload} from '../../../middleware/fileupload.middleware.js'

//initialize express Router
const productRouter = express.Router();

// initialize the product controller
const productController = new ProductController();

productRouter.get('/',productController.getAllProducts)
productRouter.post('/', upload.single('imageUrl') ,productController.addProduct)
productRouter.get('/:id',productController.getOneProduct)

export default productRouter;
