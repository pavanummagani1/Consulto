import express from 'express';
import dotenv from'dotenv'
import router from "./Routes/router.js"
import cors from 'cors'
import connectDB from './config/connectDB.js';
dotenv.config()

const PORT = process.env.PORT || 3500
const app =  express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })) 
app.use(cors());
app.use("/",router)

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`http://localhost:${PORT}`)
    })
})