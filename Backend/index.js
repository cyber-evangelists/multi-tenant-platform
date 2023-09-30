import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";
import storeRoute from "./routes/store.routes.js";
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use("/user", userRoute);
app.use("/store", storeRoute);
