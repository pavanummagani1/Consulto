import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    address: {
        type: Object,
        default: {
            landmark: 'Near abc, Road No-2',
            city: 'abcd',
            pincode: '000000'
        }
    },
    gender: {
        type: String,
        default: "female"
    },
    age: {
        type: Number,
        default: 0
    },
    mobileNumber: {
        type: Number,
        default: 0
    },
    userid: {
        type: String,
        required: true
    },
    appointmentdetails: {
        type: [{
            type: Object,
            required: false
        }]
    },
    date: {
        type: String,
    }
})

const userModel = mongoose.models.users || mongoose.model('users', userSchema)

export default userModel;