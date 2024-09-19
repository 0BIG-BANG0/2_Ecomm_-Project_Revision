import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
  }

  
  
  static getAll() {
    return users;
  }
}

let users = [
  {
    id: 1,
    name: "seller",
    email: "seller@ecom.com",
    password: "seller",
    type: "seller",
  },
  {
    id: 2,
    name: "customer",
    email: "customer@ecom.com",
    password: "customer",
    type: "customer",
  },
];
