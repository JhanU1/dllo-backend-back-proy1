import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema({
  products: Array,
  user_id: String,
});

const Cart = mongoose.model("Cart", cartSchema);

async function createCart(cart) {
  return await Cart.create(cart);
}

async function getCart(user_id) {
  return await Cart.findOne({ user_id }).exec();
}

async function addProductToCart(user_id, product_id) {
  const cart = await getCart(user_id);
  if (cart) {
    cart.products.push({ product_id, _id: new mongoose.Types.ObjectId() });
    return await cart.save();
  } else {
    return await createCart({
      products: [{ product_id, _id: new mongoose.Types.ObjectId() }],
      user_id,
    });
  }
}

async function deleteProductFromCart(product_id) {
  const res = await Cart.find({
    "products._id": { $in: [new mongoose.Types.ObjectId(product_id)] },
  }).exec();
  if (res.length > 0) {
    const cart = res[0];
    cart.products = cart.products.filter(
      (product) => !new mongoose.Types.ObjectId(product_id).equals(product._id)
    );
    await cart.save();
    return cart.products;
  }
}

async function deleteCart(user_id) {
  return await Cart.findOneAndDelete({ user_id }).exec();
}

async function getCars() {
  return await Cart.find({}).exec();
}

export {
  getCart,
  addProductToCart,
  deleteProductFromCart,
  deleteCart,
  getCars,
};
