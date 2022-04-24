import mongoose from "mongoose";
const { Schema } = mongoose;

const historySchema = new Schema({
  carts: Array,
  user_id: String,
});

const History = mongoose.model("History", historySchema);

async function createHistory(history) {
  return await History.create(history);
}

 async function getUserHistory(user_id) {
  return await History.findOne({user_id}).exec();
}

async function addCartToHistory(user_id, cart) {
  const history = await getUserHistory(user_id);
  if (history) {
    history.carts.push(cart);
    await history.save();
  } else {
    await createHistory({
      carts: [cart],
      user_id,
    });
  }
}

async function getHistories() {
  return await History.find({}).exec();
}

export { addCartToHistory, getHistories, getUserHistory };
