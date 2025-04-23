import express from 'express';
import dotenv from'dotenv'
import router from "./Routes/router.js"
import cors from 'cors'
dotenv.config()

const PORT = process.env.PORT || 3500
const app =  express();
app.use(express.json());
app.use(cors());
app.use("/",router)

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
})