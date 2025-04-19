import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  offerPrice: { type: Number },
  category: { type: String, required: true },
  images: { type: [String], required: true }, // Store an array of image filenames
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  inStock: { type: Boolean, default: true }
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
