import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import clientRouter from "./routes/clientRoute.js"
import doctorRoute from "./routes/doctorRoute.js"

const app = express()
dotenv.config()
app.use(cors({
    origin: 'https://consulto-zeta.vercel.app',
    credentials: true
}))
const port = process.env.PORT || 3200
app.use(express.json())

app.use('/admin', adminRouter) //http:localhost:3201/admin/adddoctor
app.use('/', clientRouter)
app.use('/doctor',doctorRoute)
connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`server started sucessfully at http://localhost:${port}`)
    })
})
connectCloudinary()