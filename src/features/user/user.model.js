export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this.id = id;
  }

  static SignUp(name, email, password, type) {
    const newUser = new UserModel(name, email, password, type);
    newUser.id = users.length + 1;
    users.push(newUser);
    return newUser;
  }
  static SignIn(email, password) {
    const user = users.find((u) => u.email == email && u.password == password);
    return user;
  }
  static getAll(){
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
