import express from 'express'
import productRouter from './src/features/product/routes/product.routes.js';
import bodyParser from 'body-parser';
import userRouter from './src/features/user/user.routes.js';

//Create an instance of express app
const app = express()

//body Parser Middleware is used
app.use(express.json())

// Using the router for handling routes 
//best practice it to name it in a propper manner
app.use('/api/products',productRouter)
app.use('/api/users',userRouter)

export default app;