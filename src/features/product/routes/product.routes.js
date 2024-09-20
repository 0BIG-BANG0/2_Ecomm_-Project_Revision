import express from "express";
import ProductController from "../controller/product.controller.js";
import { upload } from "../../../middleware/fileupload.middleware.js";

//initialize express Router
const productRouter = express.Router();

// initialize the product controller
const productController = new ProductController();

productRouter.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});
productRouter.post("/", upload.single("imageUrl"), (req, res) => {
  productController.addProduct(req, res);
});
productRouter.get("/filter", productController.filterProduct); // localhost:2300/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.get("/:id", (req, res) => {
  productController.getOneProduct(req, res);
});
productRouter.post("/rate", productController.rateProduct);

export default productRouter;
