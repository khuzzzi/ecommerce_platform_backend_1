import jwt from "jsonwebtoken"

export const isSellerAuth = async(req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                msg : "user not authenticated",
                success : false
            })
        }

        const verifyingSeller = await jwt.verify(token,process.env.SECRET_KEY_FOR_JWT)
        
        if(!verifyingSeller){
            return res.status(401).json({
                msg : "invalid user",
                success : false
            })
        }
        req.id = verifyingSeller.seller_id 

        next()

    } catch (error) {
        console.log(error)
    }
}

