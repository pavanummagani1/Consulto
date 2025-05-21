import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import clientRouter from "./routes/clientRoute.js"
import doctorRoute from "./routes/doctorRoute.js"
import paymentRouter from "./routes/paymentRoute.js"
import './utils/statusUpdater.js' 

const app = express()
dotenv.config()
app.use(cors({
    origin: ['https://consulto-zeta.vercel.app','http://localhost:5173'],
    credentials: true
}))
const port = process.env.PORT || 3200
app.use(express.json())



app.use('/admin', adminRouter)
app.use('/', clientRouter)
app.use('/doctor',doctorRoute)
app.use('/api/payments', paymentRouter);


connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started successfully at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("Database connection failed", err);
    process.exit(1);
  });
connectCloudinary()