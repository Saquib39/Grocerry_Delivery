import productModel from "../models/productModel.js";
import fs from 'fs';

const addProduct = async (req, res) => {
  let image_filenames = req.files.map(file => file.filename); // Handle multiple images
  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    originalPrice: req.body.originalPrice,
    offerPrice: req.body.offerPrice,
    category: req.body.category,
    images: image_filenames, // Store multiple images
  });

  try {
    await product.save();
    res.json({ success: true, message: "✅ Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || "❌ Error" });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);
    fs.unlink(`uploads/${product.images}`, () => {}); // Delete image from uploads folder
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const updateStock = async (req, res) => {
  try {
    await productModel.findByIdAndUpdate(req.body.ProductId, { inStock: req.body.inStock });
    res.json({ success: true, message: "Stock status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addProduct, removeProduct, listProduct, updateStock };
