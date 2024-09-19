import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class UserRepository {
  async signUp(newUser) {
    try {
      //1. get the db
      const db = getDB();
      //2. get the collection
      const collection = db.collection("users");
      //3. Check if Existing user Exist or not
      const existingUser = await collection.findOne({ email: newUser.email });
      if (existingUser) {
        throw new ApplicationError("USER ALREADY EXIST CANT CREATE DUPLICATE");
      }
      //4. use insertOne() to add user
      await collection.insertOne(newUser); //insertOne func return us promise
      return newUser;
    } catch (err) {
      console.log(err);
      // Check if error is due to the unique index constraint
      if (err.code === 11000) {
        throw new ApplicationError(
          "Email already exists. Please use a different email."
        );
      }

      throw new ApplicationError("Something went wrong during sign-up.");
    }
  }
  async signIn(email, password) {
    try {
      //1. get the db
      const db = getDB();
      //2. get the collection
      const collection = db.collection("users");
      //3. use FindOne()
      return await collection.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong");
    }
  }
  async findByEmail(email) {
    try {
      //1. get the db
      const db = getDB();
      //2. get the collection
      const collection = db.collection("users");
      //3. use FindOne()
      return await collection.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong");
    }
  }
}
export default UserRepository;
