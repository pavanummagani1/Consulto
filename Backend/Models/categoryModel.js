import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    catid:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    categoryImage:{
        type:String,
        required:true
    }
},{minimize:false})

const categoryModel = mongoose.models.categories || mongoose.model('categories', categorySchema)

export default categoryModel;