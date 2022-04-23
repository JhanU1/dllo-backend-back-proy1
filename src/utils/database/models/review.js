import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
  product_id: String,
  user_id: String,
  rating: String,
  description: String,
});

const Review = mongoose.model("Review", reviewSchema);

async function createReview(review) {
  return await Review.create(review);
}

async function getReviews() {
  return await Review.find().exec();
}

async function getReviewById(id) {
  return await Review.findById(id).exec();
}

async function getReviewsByProductIdAndUserId(product_id, user_id) {
  return await Review.find({ product_id, user_id }).exec();
}

export {
  createReview,
  getReviews,
  getReviewById,
  getReviewsByProductIdAndUserId,
};
