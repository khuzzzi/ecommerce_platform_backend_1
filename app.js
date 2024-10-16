import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import buyerRoutes from "./routes/buyer.route.js";
import sellerRoutes from "./routes/seller.route.js";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productsActs.route.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// CORS configuration
const corsOptions = {
    origin: "https://newnewfrontendecommerce-4gzr-2lergjyvw-khuzzzis-projects.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS middleware before defining routes
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define routes
app.use("/api/v1/buyer", buyerRoutes);
app.use("/api/v1/seller", sellerRoutes);
app.use("/api/v1/productacts", productRoutes);

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
        app.listen(PORT, () => {
            console.log(`Server started at ${PORT}`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });
