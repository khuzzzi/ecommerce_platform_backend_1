import express from "express";
import { 
    addingProducts, 
    registerSellerAccount, 
    sellerAccountLogin, 
    showAllProducts, 
    showSellerOnlyProducts 
} from "../controllers/seller.controller.js";
import { isSellerAuth } from "../middlewares/isSellerAuth.js";
import upload from "../middlewares/multer.js";
import validateProductImageDimensions from "../middlewares/settingDimensions.js";
import productImageBackgroundRemove from "../middlewares/backgroundRemove.js";
import uploadToFirebase from "../middlewares/uploadToFireBaseStorage.js";
import allowCors from "../allowcors.js"; // Import allowCors

const router = express.Router();

router.route("/registerSellerAccount").post(allowCors(registerSellerAccount)); // Wrap with allowCors
router.route("/loginSellerAccount").post(allowCors(sellerAccountLogin)); // Wrap with allowCors
router.route("/addingProducts").post(
    isSellerAuth,
    upload.single('productImages'),
    validateProductImageDimensions,
    productImageBackgroundRemove,
    uploadToFirebase,
    allowCors(addingProducts) // Wrap with allowCors
);
router.route("/showSellerProducts").get(isSellerAuth, allowCors(showSellerOnlyProducts)); // Wrap with allowCors
router.route("/allProducts").get(allowCors(showAllProducts)); // Wrap with allowCors

export default router;
