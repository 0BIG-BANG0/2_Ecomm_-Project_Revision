import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApplicationError } from "../../error-handler/applicationError.js";
import UserRepository from "./user.repository.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new UserModel(name, email, hashedPassword, type);

      await this.userRepository.signUp(user);

      //Best Practice is to exclude the password before sending to the client
      // Setting password to undefined before sending it
      user.password = undefined;
      res.status(201).send(user);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something Went Wrong");
    }
  }
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      //1. Check Email
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return res.status(400).send("Incorrect Credential");
      } else {
        //2. else compare password with hashed password
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          //3.create token
          const token = jwt.sign(
            {
              userID: result.id,
              email: result.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          // 2.Send token
          return res.status(200).send(token);
        } else {
          return res.status(400).send("Incorrect Credential");
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong");
    }
  }
}
