import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import clientRouter from "./routes/clientRoute.js"

const app = express()
dotenv.config()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
const port = process.env.PORT || 3200
app.use(express.json())

app.use('/admin', adminRouter) //http:localhost:3201/admin/adddoctor
app.use('/', clientRouter)

app.get('/', (req,res)=>{
    res.status(200).json({message:"Hello Express"+port})
})
connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`server started sucessfully at http://localhost:${port}`)
    })
})
connectCloudinary()