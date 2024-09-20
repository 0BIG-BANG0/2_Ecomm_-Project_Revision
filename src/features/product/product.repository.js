import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class ProductRepository {
    // It is counted as good practice as it encapsulates our code and enchances code reusability and it is called automatically when our class is initilized.
    constructor(){
        this.collection = 'products'
    }
  async add(newProduct) {
    try {
      //1. Get the DB
      const db = getDB();
      //2. Get the Collection
      const collection = db.collection(this.collection);
      //3. insert product so insertOne(para)
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      throw new ApplicationError("Somthing Wrong with the Databse");
    }
  }

  async getAll() {
    try {
        //1. Get the DB
        const db = getDB();
        //2. Get the Collection
        const collection = db.collection(this.collection);
        //3. find prosuct so find()
        const products = await collection.find().toArray();
        return products;
      } catch (err) {
        console.log(err);
        throw new ApplicationError("Somthing Wrong with the Databse");
      }
  }

  async get(id) {
    try {
        //1. Get the DB
        const db = getDB();
        //2. Get the Collection
        const collection = db.collection(this.collection);
        //3. find prosuct so find()
        const product = await collection.findOne({_id: new ObjectId(id)});//_id is an ObjectId so we  convert it into Object ID
        return product;
      } catch (err) {
        console.log(err)
        throw new ApplicationError("Somthing Wrong with the Databse");
      }
  }
}
export default ProductRepository;
