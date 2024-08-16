import UserModel from "./user.model.js";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'


export default class UserController {
  signUp(req, res) {
    const { name, email, password, type } = req.body;
    const user = UserModel.SignUp(name, email, password, type);
    res.status(201).send(user);
  }
  signIn(req, res) {
    const { email, password } = req.body;
    const result = UserModel.SignIn(email, password);
    if (!result) {
      return res.status(400).send("Incorrect Credential");
    } else {
      // 1.Create token
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
    }
  }
}
