import express from "express"
import { addingProducts, registerSellerAccount, sellerAccountLogin, showAllProducts, showSellerOnlyProducts } from "../controllers/seller.controller.js"
import { isSellerAuth } from "../middlewares/isSellerAuth.js"
import upload from "../middlewares/multer.js"
import validateProductImageDimensions from "../middlewares/settingDimensions.js"
import productImageBackgroundRemove from "../middlewares/backgroundRemove.js"
import uploadToFirebase from "../middlewares/uploadToFireBaseStorage.js"


const router = express.Router()

router.route("/registerSellerAccount").post(registerSellerAccount)
router.route("/loginSellerAccount").post(sellerAccountLogin)
router.route("/addingProducts").post(isSellerAuth,upload.single('productImages'),validateProductImageDimensions,productImageBackgroundRemove,uploadToFirebase,addingProducts)
router.route("/showSellerProducts").get(isSellerAuth,showSellerOnlyProducts)
router.route("/allProducts").get(showAllProducts)
export default router