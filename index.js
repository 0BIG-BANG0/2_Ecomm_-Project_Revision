import express from 'express'
import productRouter from './src/features/product/routes/product.routes.js';
import bodyParser from 'body-parser';

//Create an instance of express app
const app = express()

//body Parser Middleware is used
app.use(bodyParser.json())

// Using the router for handling routes 
//best practice it to name it in a propper manner
app.use('/api/products',productRouter)

export default app;