import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    sellerName : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    // the products he is selling
    productDetails : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "ProductDetails"
    }
        
})

const SellerDetails = mongoose.model("SellerDetails",sellerSchema)
export default SellerDetails