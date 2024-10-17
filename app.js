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
    origin: "https://newnewfrontendecommerce.vercel.app",
    credentials: true,
    
    
}));
app.use(cookieParser())

app.use("/api/v1/buyer",buyerRoutes)
app.use("/api/v1/seller",sellerRoutes)
app.use("/api/v1/productacts",productRoutes)