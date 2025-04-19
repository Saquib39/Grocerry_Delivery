import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // No need for useNewUrlParser and useUnifiedTopology
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ DB Connection Error:", error);
    }
};
