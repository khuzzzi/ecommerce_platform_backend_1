import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema({
    
    firstname : {
        type : String,
        required : true
    },
    companyname : {
        type : String,
        
    },
    shippingAddress : {
        type : String,
        required : true
    },
    
    city : {
        type : String,
        
    },
    phonenumber : {
        type : Number,
        
    },
    email : {
        type : String,
        required : true,
        
    },
    couponcode : {
        type : String
    }
})
const CheckoutDetails = mongoose.model("CheckoutSchema",checkoutSchema)
export default CheckoutDetails