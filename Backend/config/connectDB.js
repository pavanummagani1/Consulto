import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const db_URL = process.env.MONGODB_URI;

const connectDB = async()=>{
    try {
       await mongoose.connect(db_URL);
       console.log("MONGODB CONNECTED SUCCESSFULLY");
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED",error.message);
        process.exit(1)
    }
}
export default connectDB
