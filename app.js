import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import buyerRoutes from "./routes/buyer.route.js"
import sellerRoutes from "./routes/seller.route.js"
import cookieParser from "cookie-parser"
import productRoutes from "./routes/productsActs.route.js"


const app = express()

dotenv.config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})

mongoose.connect(MONGO_URI,{
}).then(()=>{console.log("mongodb connected successfully")})
    
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors({
<<<<<<< HEAD
    origin: [],
=======
    origin: ["https://newnewfrontendecommerce-4gzr.vercel.app",
    "https://newnewfrontendecommerce-4gzr-git-main-khuzzzis-projects.vercel.app",
    "https://newnewfrontendecommerce-4gzr-o6vev3yyi-khuzzzis-projects.vercel.app"], // Remove trailing slash
>>>>>>> 150ef75afa24956833f4ae6e8c86e9450695010d
    credentials: true
}));
app.use(cookieParser())

app.use("/api/v1/buyer",buyerRoutes)
app.use("/api/v1/seller",sellerRoutes)
app.use("/api/v1/productacts",productRoutes)
