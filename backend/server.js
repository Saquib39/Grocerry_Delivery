import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(join(__dirname, "uploads"))); // Serve uploaded images
app.use("/images", express.static('uploads')); // Serve uploaded images
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
// DB Connection
connectDB();

// API Endpoint
app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
