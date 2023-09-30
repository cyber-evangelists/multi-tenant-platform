import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;
const storeSchema = new Schema({
  storeName: { type: String },
  address: { type: String },
  products: [{ type: mongoose.Types.ObjectId, ref: "product" }],
  storeOwner: { type: mongoose.Types.ObjectId, ref: "Users" },
});
export default model("store", storeSchema);
