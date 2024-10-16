import BuyerDetails from "../models/buyer.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// ||


export const signup = async(req,res)=>{
    try {
        const {buyername , email , password } = req.body;
        if(!buyername || !email || !password ){
            return res.status(401).json({
                msg : "somthing is missing, all fields are required",
                success : false
            })
        }
        const buyer = await BuyerDetails.findOne({email})
        if(buyer){
            return res.status(401).json({
                msg : "buyer exists, try new email",
                success : false
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        
        await BuyerDetails.create({
            buyerName : buyername,
            email,
            password : hashedPassword
        })

        return res.status(200).json({
            msg : "user is created successfully",
            success : true
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                msg : "all fields are required",
                success : false
            })
        }

        const buyer = await BuyerDetails.findOne({email})

        const comparingPassword = bcrypt.compareSync(password,buyer.password)
        // comparison correct nhi huwa toh ye krna 
        if(!comparingPassword){
            return res.status(401).json({
                msg : "incorrect email or password",
                success : false
            })
        }
        
        const token = await jwt.sign({
            buyer_id : buyer._id
        },process.env.SECRET_KEY_FOR_JWT,{expiresIn : "1d"})

        

        return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
            message: `Welcome back ${buyer.username}`,
            success: true,
            buyer
        });
    } catch (error) {
        console.log(error)
    }
}

export const logout = async(req,res)=>{
    try {
        return res.cookie("token","",{maxAge : 0}).json({
            msg : "logout successfully",
            success : true
        })
    } catch (error) {
        console.log(error)
    }
}


export const editProfile = async(req,res)=>{
    try {
        const {firstname , lastname , email , address , currentPassword , newPassword,confirmNewPassword} = req.body
        
        const buyerId = req.id

        const Buyer = await BuyerDetails.findById(buyerId).select("")
        
        const username = firstname + lastname
        
        if(username){
            username = username + Math.random(5)
        }
        
        if(Buyer.address) Buyer.address = address
        
        const isPasswordMatched = await bcrypt.compareSync(currentPassword,Buyer.password)
        
        if(!isPasswordMatched){
            return res.status(401).json({
                msg : "incorrect account password",
                success : false
            })
        }

        if(currentPassword){
            if(currentPassword === newPassword){
                return res.status(401).json({
                    msg : "enter new password",
                    success : false
                })
            }
        }

        if(newPassword !== confirmNewPassword){
            return res.status(401).json({
                msg : "password mismatches",
                success : false
            })
        }

        const newPasswordHashed = bcrypt.hash(newPassword,10)
        
        await Buyer.save({
            buyerName : username,
            email,
            password : newPasswordHashed
        })

        return res.status(200).json({
            msg : "profile edited successfully",
            success : true
        })

    } catch (error) {
        console.log(error)
    }
}






