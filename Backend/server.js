import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import songRouter from './src/routes/songRoutes.js';
import connectDB from './src/config/Mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoutes.js';
dotenv.config();


// app config

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json()) // convert the data in json formate
app.use(cors()); // connect fronted and backend

// initializing routes

app.use("/api/song",songRouter)
app.use("/api/album",albumRouter)


app.get('/',(req,res)=>{
    res.send("api working")
})

app.listen(port,()=>{
    console.log(`Server Strted on ${port}`)
})