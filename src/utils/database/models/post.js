import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  owner_id: String,
  img_url: String,
  display_name: String,
  description: String,
  price: String,
  created_date: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

async function createPost(post) {
  return await Post.create(post);
}

async function getPosts() {
  return await Post.find({}).exec();
}

async function getUserPosts(owner_id) {
  return await Post.find({ owner_id }).exec();
}

async function getPostById(id) {
  return await Post.findById(id).exec();
}

async function removePostById(id) {
  return await Post.findByIdAndRemove(id).exec();
}

async function recentPosts() {
  return await Post.find({}).limit(10).exec();
}

async function getPostReviews(postId) {
  const reviews = await Post.aggregate([
    { $match: { _id: postId } },
    {
      $project: {
        "_id": {
          $toString: "$_id"
        }
      }
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "product_id",
        as: "reviews"
      }
    },
    { $project: { _id: 0, reviews: 1 } },
  ]).exec();
  return reviews[0].reviews;
}

export {
  createPost,
  getPosts,
  getPostById,
  removePostById,
  getUserPosts,
  recentPosts,
  getPostReviews,
};
