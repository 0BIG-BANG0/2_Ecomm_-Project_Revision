import { ApplicationError } from "../../../error-handler/applicationError.js";
import ProductModel from "../model/product.model.js";
import ProductRepository from "../product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getAllProducts(req, res) {
    try {
      const product = await this.productRepository.getAll();
      res.status(200).json(product);
    } catch (err) {
      console.log("ERROR", err);
      throw new ApplicationError("Something Went Wrong with getAll");
    }
  }
  async addProduct(req, res) {
    const { name, price, sizes } = req.body;
    const newProduct = new ProductModel(
      name,
      null,
      parseFloat(price),
      req.file.filename,
      null,
      sizes.split(",")
    );

    try {
      const createdProduct = await this.productRepository.add(newProduct);
      console.log(createdProduct);
      res.status(201).json(createdProduct);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Somthing went wrong with addProduct");
    }
  }
  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await this.productRepository.get(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).send("Not Found");
      }
    } catch (err) {
      console.log(err)
      throw new ApplicationError("Something went wrong with getOnProduct");
    }
  }
  filterProduct(req, res) {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    const result = ProductModel.filter(minPrice, maxPrice, category);

    res.status(200).send(result);
  }
  rateProduct(req, res) {
    console.log(req.query);
    const userID = req.query.userID;
    const productID = req.query.productID;
    const rating = req.query.rating;
    try {
      ProductModel.rateProduct(userID, productID, rating);
    } catch (err) {
      res.status(400).send(err.message);
    }
    return res.status(200).send("Rating has been added");
  }
}
