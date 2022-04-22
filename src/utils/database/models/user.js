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

export {
  createUser,
  getUserById,
  getUsers,
  getUserWithCredentials,
  getUserByUserName,
};
