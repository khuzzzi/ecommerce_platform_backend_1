import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import buyerRoutes from "./routes/buyer.route.js";
import sellerRoutes from "./routes/seller.route.js";
import productRoutes from "./routes/productsActs.route.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set
const MONGO_URI = process.env.MONGO_URI;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "https://new-frontend-1-ecommerce-rixmv3yll-khuzaimas-projects-01d2a82b.vercel.app",
    credentials: true,
}));
app.use(cookieParser());

// MongoDB connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected successfully");
        // Start the server only after successful connection
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

// Routes setup
app.use("/api/v1/buyer", buyerRoutes);
app.use("/api/v1/seller", sellerRoutes);
app.use("/api/v1/productacts", productRoutes);
