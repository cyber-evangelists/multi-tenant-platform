import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;
const productSchema = new Schema({
  name: { type: String },
  price: { type: Number },
});
export default model("product", productSchema);
