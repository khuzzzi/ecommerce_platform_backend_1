import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema({
    buyerName : {
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
    profilePicture : {
        type : String,
    },
    ratedProducts : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'ProductDetails'
    },
    wishList : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'ProductDetails'
    },
    boughtProducts : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'ProductDetails'
    },

        
})

const BuyerDetails = mongoose.model("BuyerDetails",buyerSchema)
export default BuyerDetails

// what can we need : 
// the product details he will buy
// user image
// Billing address
// Shipping address
// Country state everything
// rating details about the product he gives