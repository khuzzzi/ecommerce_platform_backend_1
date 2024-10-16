import SellerDetails from "../models/seller.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import sharp from "sharp"
import ProductDetails from "../models/productDetails.model.js"
// ||

export const registerSellerAccount = async(req,res)=>{
    
    const {sellerName , email , password} = req.body
    
    if(!sellerName || !email || !password){
        return res.status(401).json({
            msg : "all fields are required, something is missing",
            success : false
        })
    }

    const sellerAccountDetails = await SellerDetails.findOne({email})
    
    if(sellerAccountDetails){
        return res.status(401).json({
            msg : "seller exists with this credentials",
            success : false
        })
    }

    const hashingSellerAccountPassword = await bcrypt.hash(password,10)
    
    SellerDetails.create({
        sellerName,
        email,
        password : hashingSellerAccountPassword 
    })

    return res.status(200).json({
        msg : "Seller account is created successfully, you may now sell your products",
        success : true,
        sellerAccountDetails
    })
    
}

export const sellerAccountLogin = async(req,res)=>{
    try {
        const {email , password} = req.body
        if(!email || !password ){
            return res.status(401).json({
                msg : "all fields are required, something is missing",
                success : false
            })
        }
        const seller = await SellerDetails.findOne({email})
        const isPasswordCorrect = await bcrypt.compare(password,seller.password)

        if(!isPasswordCorrect){
            return res.status(401).json({
                msg : "incorrect email or password",
                success : false
            })
        }

        const token = await jwt.sign({
            seller_id : seller._id
        },process.env.SECRET_KEY_FOR_JWT,{expiresIn : "1d"})

        

        return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
            message: `Welcome back ${seller.sellerName}`,
            success: true,
            seller
        });

    } catch (error) {
        console.log(error)
    }
}

export const addingProducts = async (req, res) => {
    try {
        const { productName, description, brand, category, price } = req.body;
        
        // If you expect multiple images, ensure you handle them correctly
        const productImages = req.file.firebaseUrl ? [req.file.firebaseUrl] : []; // Wrap in array if it's a single URL
        const seller_id = req.id
        const productDetails = {
            sellerName : seller_id,
            productName,
            description,
            brand,
            category,
            price,
            productImages // This should now be an array
        };

        // Create and save the product details
        const allProductDetails = await ProductDetails.create(productDetails);
        
        await SellerDetails.findByIdAndUpdate(seller_id, {
            $push: { productDetails: allProductDetails._id } // Add the new product ID to the seller's productDetails
        });
        
        return res.status(200).json({
            msg: "Product is added",
            success: true,
            allProductDetails
        });
        
    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({
            msg: "Error adding product",
            success: false,
            error: error.message
        });
    }
};


export const showSellerOnlyProducts = async(req,res)=>{
    try {
        const sellerOnlyProductDetails = await SellerDetails.findById(req.id)
        .populate("productDetails")
        .select("sellerName productName description brand category price productImages")
        
        if(!sellerOnlyProductDetails){
            return res.status(401).json({
                msg : "no products listed",
                success : false
            })
        }


        return res.status(200).json({
            msg : "here are the seller only products",
            sellerOnlyProductDetails,
            success : true
        })

        
    } catch (error) {
        console.log(error)
    }
}

export const showAllProducts = async(req,res)=>{
    try {
        const allProducts = await ProductDetails.find()
        if(!allProducts){
            return res.status(401).json({
                msg : "no products listed",
                success : false
            })
        }

        return res.status(200).json({
            msg : "here are all the products",
            success : true,
            allProducts
        })
    } catch (error) {
        console.log(error)
    }
}

