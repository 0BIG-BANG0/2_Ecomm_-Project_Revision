import express from 'express'

//Create an instance of express app
const app = express()

app.get('/',(req,res)=>{
    res.send("Welcome to Ecommerce API's")
})

export default app;