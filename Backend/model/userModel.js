import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: Number,
      //   required: true,
    },
    email: {
      type: String,
      //   required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    numberOfStores: {
      type: Number,
      default: 0,
    },
    // image: {
    //   type: String,
    //   default: "download.jpeg",
    // },
  },
  { timestamps: true }
);
export default model("Users", userSchema);
