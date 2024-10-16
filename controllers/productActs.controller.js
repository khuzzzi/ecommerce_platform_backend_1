import BuyerDetails from "../models/buyer.model.js"
import CheckoutDetails from "../models/checkout.model.js"
import ProductDetails from "../models/productDetails.model.js"
import WishListedProduct from "../models/wishlistedProduct.model.js"
import nodemailer from "nodemailer";

export const addToCart = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
    }
}




export const seeingProducts = async(req,res)=>{
    const productId = req.params.id
    const productDetails = await ProductDetails.findById(productId)
    
    
    if(!productDetails){
        return res.status(401).json({
            msg : "no product on this id",
            success : false
        })
    }
    
    return res.status(200).json({
        msg : "here is the product on this id",
        productDetails,
        success : true
    })
}

export const checkoutProduct = async(req,res)=>{
    try {
        const checkoutedProductId = req.params.id
        const checkoutedProduct = await ProductDetails.findById(checkoutedProductId)
        
        
        if(!checkoutedProductId || !checkoutedProduct){
            return res.status(401).json({
                msg : "invaid product id or product doesnot exist on this id",
                success : false
            })
        }
        
    
        return res.status(200).json({
            msg : "here is your checkouted Product",
            checkoutedProduct,
            success : true
        })

    } catch (error) {
        console.log(error)
    }
}

export const gettingUserDataForCheckout = async (req, res) => {
    try {
        const { firstname, companyname, shippingAddress, city, phonenumber, email } = req.body;

        // Log the incoming request body

        // Check for required fields
        if (!firstname || !shippingAddress || !email) {
            return res.status(401).json({
                msg: "Something is missing; all fields are required",
                success: false
            });
        }

        const user = {
            firstname,
            companyname,
            shippingAddress,
            city,
            phonenumber,
            email
        };

        // Create a new document in the CheckoutDetails collection
        const newCheckoutDetail = await CheckoutDetails.create(user);

        return res.status(200).json({
            msg: "Here is your user",
            user: newCheckoutDetail,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "An error occurred",
            success: false
        });
    }
};

export const checkingCouponCode = async(req,res)=>{
    await CheckoutDetails.create({
        couponcode : "ABCD123"
    })

    const couponCode = await CheckoutDetails.find({couponcode})
    const {code} = req.body

    if(code!==couponCode){
        return res.status(401).json({
            msg : "copuon code doesnot exist",
            success : false
        })
    }

    if(code === couponCode){
        return res.status(200).json({
            msg : "coupon code matched",
            success : true
        })
    }
}


export const addToWishlist = async(req,res)=>{
    try {
        const productId = req.params.id
        const buyerId = req.id
        
        // if(!buyerId){
        //     return res.status(401).json({
        //         msg : "something went wrong either product doesnot exist or user not authenticated",
        //         success : false
        //     })
        // }


        await WishListedProduct.create({
            wishListedProduct : productId,
            wishlister : buyerId
        })

        
        return res.status(200).json({
            msg : "added to wishlist",
            success  : true
        })
    } catch (error) {
        console.log(error)
    }
}


export const removeFromWishlist = async(req,res)=>{
    try {
        const productId = req.params.id
        await WishListedProduct.findByIdAndDelete(productId)

        

        return res.status(200).json({
            msg : "remove from wishlist",
            success : true
        })
    } catch (error) {
        console.log(error)
    }
}

export const sendingemail = async(req,res)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or use another service
        auth: {
            user: process.env.GMAIL_EMAIL, // your email
            pass: process.env.GMAIL_PASSWORD // your email password
        }
    });
    try {
        
        const receiverEmail = req.params.email; // Get receiver email from details
        
        
        
        const mailOptions = {
            from: process.env.GMAIL_EMAIL,
            to: receiverEmail, // Send to the found email
            subject: 'Email From Exclusive',
            text: 'Thanks For Buying Stuff From EXCLUSIVE!!! You Have bought Something extremely amazing.......',
            // html: '<h1>Hello</h1><p>This is a test email.</p>', // Use this for HTML content
        };

        // Send the email
        const result = await transporter.sendMail(mailOptions);
        
    } catch (error) {
        console.error('Error sending email:', error);
    }
}