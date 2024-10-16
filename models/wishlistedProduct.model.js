import mongoose from "mongoose";

const wishlistedProductSchema = new mongoose.Schema({
    wishListedProduct : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "ProductDetails"
    },
    wishlister : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "BuyerDetails"
    }
        
})

const WishListedProduct = mongoose.model("WishListedProduct",wishlistedProductSchema)
export default WishListedProduct