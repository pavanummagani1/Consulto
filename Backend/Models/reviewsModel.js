import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  reviewid: {
    type: Number,
    required: true,
    unique: true
  },
  patientName: {
    type: String,
    required: true
  },
  patientImg: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review