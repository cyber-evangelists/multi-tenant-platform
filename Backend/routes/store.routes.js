import { Router } from "express";
import {
  addProduct,
  createStore,
  getProduct,
  getStores,
} from "../controller/storeController.js";
const router = Router();
router.post("/createStore", createStore);
router.get("/getStores/:userId", getStores);
router.post("/addProduct", addProduct);
router.get("/getProduct/:storeId", getProduct);
export default router;
