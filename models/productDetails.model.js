import mongoose from "mongoose";

const productDetailsSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    brand : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true
    },
    price : {
        type : Number
    },
    productImages : [{
        type : String
    }],
    sellerName : {
        type : mongoose.Schema.Types.ObjectId,
        ref :  "SellerDetails"
    }
})

const ProductDetails = mongoose.model("ProductDetails",productDetailsSchema)
export default ProductDetails