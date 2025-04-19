import express from "express";
import { addProduct, listProduct, removeProduct, updateStock } from "../controllers/productController.js";
import multer from "multer";

const productRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

productRouter.post("/add", upload.array('images', 4), addProduct); // Upload up to 4 images
productRouter.get("/list", listProduct);
productRouter.post("/remove", removeProduct);
productRouter.post("/update", updateStock);

export default productRouter;
 