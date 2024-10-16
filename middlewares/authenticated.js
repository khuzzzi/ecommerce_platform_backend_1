
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                msg : "user not authenticated",
                success : false
            })
        }
        const verifyingUser = await jwt.verify(token,process.env.SECRET_KEY_FOR_JWT)
        if(!verifyingUser){
            return res.status(401).json({
                msg : "user not authenticated",
                success : false
            })
        }
        req.id = verifyingUser.buyer_id  
        next()
        // verifyingUser.buyer_id = req.id

        
    } catch (error) {
        console.log(error)
    }
};



