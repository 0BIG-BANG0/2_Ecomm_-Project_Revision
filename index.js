import express from "express";
import dotenv from "dotenv";
import swagger from "swagger-ui-express";
import cors from 'cors'
import productRouter from "./src/features/product/routes/product.routes.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
import basicAuthorizer from "./src/middleware/basicAuth.middleware.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import cartRouter from "./src/features/cart/cartItems.routes.js";
import apiDocs from "./swagger.json" assert { type: "json" };
import loggeerMiddleware from "./src/middleware/logger.middleware.js";
dotenv.config();

//Create an instance of express app
const app = express();

//CORS policy configuration
var corsOptions = {
    origin: 'http://127.0.0.1:5500',
  }
app.use(cors(corsOptions))

//If we want to give access to all the client thenuse this *
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Method", "*");
//   //retrun ok for preflight request
//   if(req.method=="OPTIONS"){
//     return res.sendStatus(200)
//   }
//   next();
// });

//body Parser Middleware is used
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//swager - Bearer<token>

app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

//Aplying Logger Middleware at Application Level
app.use(loggeerMiddleware)

// Using the router for handling routes
//best practice it to name it in a propper manner
app.use("/api/products", jwtAuth, productRouter);
app.use("/api/cartItems", jwtAuth, cartRouter);
app.use("/api/users", userRouter);
//Middleware to handle 404 request keep it at the end if none of the above api handles the req then this api is executed

app.use((req, res) => {
  res
    .status(404)
    .send(
      "API not found. Please check our Documentation for more information at /api-docs"
    );
});

export default app;
