import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  owner_id: String,
  img_url: String,
  display_name: String,
  description: String,
  price: String,
});

const Post = mongoose.model("Post", postSchema);

async function createPost(post) {
  return await Post.create(post);
}

async function getPosts() {
  return await Post.find({}).exec();
}

async function getUserPosts(owner_id) {
  return await Post.find({ owner_id}).exec();
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

export {
  createPost,
  getPosts,
  getPostById,
  removePostById,
  getUserPosts,
  recentPosts,
};
