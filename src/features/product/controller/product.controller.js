import ProductModel from "../model/product.model.js";

export default class ProductController {
  getAllProducts(req, res) {
    const product = ProductModel.getAll();
    res.status(200).send(product);
  }
  addProduct(req, res) {
    const { name, price, sizes } = req.body;
    const newProduct = {
      name,
      price: parseFloat(price),
      sizes: sizes.split(","),
      imageUrl: req.file.filename,
    };
    const createdProduct = ProductModel.add(newProduct);
    res.status(201).send(createdProduct);
  }
  getOneProduct(req, res) {
    const id = req.params.id;
    const product = ProductModel.get(id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send("Not Found");
    }
  }
  rateProduct(req, res) {}
}
