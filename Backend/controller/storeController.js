import storeModel from "../model/storeModel.js";
import productModel from "../model/productModel.js";
export const createStore = async (req, res) => {
  try {
    const { storeName, address, userId } = req.body;
    const store = await storeModel.create({
      storeName: storeName,
      address: address,
      storeOwner: userId,
    });
    res.status(200).json({ store });
  } catch (err) {
    res.status(500).json({ err });
  }
};
export const getStores = async (req, res) => {
  try {
    const { userId } = req.params;
    const stores = await storeModel
      .find({ storeOwner: userId })
      .populate("products");

    res.status(200).json({ stores });
  } catch (err) {
    res.status(500).json({ err });
  }
};
export const addProduct = async (req, res) => {
  try {
    const { name, price, storeId } = req.body;
    console.log(name, price, storeId);
    const product = await productModel.create({ name: name, price: price });
    const store = await storeModel.updateOne(
      { _id: storeId },
      { $push: { products: product._id } }
    );

    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ err });
  }
};
export const getProduct = async (req, res) => {
  try {
    const { storeId } = req.params;
    console.log(storeId);
    const result = await storeModel.find({ _id: storeId }).populate("products");
    res.status(200).json({ products: result.products });
    console.log(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};
