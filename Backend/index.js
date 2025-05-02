import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"

const app = express()
dotenv.config()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))
const port = process.env.PORT || 3200
app.use(express.json())

app.use('/admin', adminRouter) //http:localhost:3201/admin/adddoctor

app.get('/', (req,res)=>{
    res.status(200).json({message:"Hello Express"+port})
})
connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`server started sucessfully at http://localhost:${port}`)
    })
})
connectCloudinary()