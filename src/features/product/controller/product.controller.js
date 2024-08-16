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
  filterProduct(req, res) {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    const result = ProductModel.filter(minPrice, maxPrice, category);

    res.status(200).send(result);
  }
  rateProduct(req, res) {
    console.log(req.query)
    const userID = req.query.userID;
    const productID = req.query.productID;
    const rating = req.query.rating;
    const error = ProductModel.rateProduct(
      userID,
      productID,
      rating
    )
    console.log(error)
    if(error){
      res.status(400).send(error)
    }else{
      return res.status(200).send("Rating has been added");
    }
  }
}
