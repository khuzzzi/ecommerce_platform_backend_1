import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import buyerRoutes from "./routes/buyer.route.js";
import sellerRoutes from "./routes/seller.route.js";
import productRoutes from "./routes/productsActs.route.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// CORS middleware
const allowCors = (fn) => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'https://new-frontend-1-ecommerce-vercel-project.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    return await fn(req, res);
};

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB connection
mongoose.connect(MONGO_URI)
    .then(() => { console.log("MongoDB connected successfully"); })
    .catch(err => { console.error("MongoDB connection error:", err); });

// Use allowCors for your routes
app.use("/api/v1/buyer", allowCors(buyerRoutes));
app.use("/api/v1/seller", allowCors(sellerRoutes));
app.use("/api/v1/productacts", allowCors(productRoutes));

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
