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
  return await User.aggregate([
    { $match: { _id: userId } },
    {
      $lookup: {
        from: "post",
        localField: "_id",
        foreignField: "owner_id",
        as: "posts",
      },
    },
    { $project: { posts: 1 } },
    { $unwind: "$posts" },
  ]).exec();
}

async function getUserReviews(userId) {
  return await User.aggregate([
    { $match: { _id: userId } },
    {
      $lookup: {
        from: "review",
        localField: "_id",
        foreignField: "user_id",
        as: "reviews",
      },
    },
    { $project: { reviews: 1 } },
    { $unwind: "$reviews" },
  ]).exec();
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
