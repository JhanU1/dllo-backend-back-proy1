import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  display_name: String,
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

async function createUser(userMap) {
  const user = new User(userMap);
  return await user.save();
}

async function getUserById(userId) {
  return await User.findById(userId).exec();
}

async function getUserByUserName(username) {
  return await User.findOne({ username }).exec();
}

async function getUserWithCredentials(username, password) {
  return await User.findOne({ username, password }).exec();
}

async function getUsers() {
  return await User.find({}).exec();
}

async function getUserPosts(userId) {
  const posts = await User.aggregate([
    { $match: { _id: userId } },
    {
      $project: {
        _id: {
          $toString: "$_id",
        },
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "owner_id",
        as: "posts",
      },
    },
    { $project: { _id: 0, posts: 1 } },
  ]).exec();

  return posts[0].posts;
}

async function getUserReviews(userId) {
  const reviews = await User.aggregate([
    { $match: { _id: userId } },
    {
      $project: {
        _id: {
          $toString: "$_id",
        },
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "user_id",
        as: "reviews",
      },
    },
    { $project: { _id: 0, reviews: 1 } },
  ]).exec();
  return reviews[0].reviews;
}

export {
  createUser,
  getUserById,
  getUsers,
  getUserWithCredentials,
  getUserByUserName,
  getUserPosts,
  getUserReviews,
};
