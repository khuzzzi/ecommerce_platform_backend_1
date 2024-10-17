import express from "express";
import { 
    addToWishlist, 
    checkoutProduct, 
    gettingUserDataForCheckout, 
    removeFromWishlist, 
    seeingProducts, 
    sendingemail 
} from "../controllers/productActs.controller.js";
import { isAuthenticated } from "../middlewares/authenticated.js";
import allowCors from "../allowcors";

const router = express.Router();

router.route("/details/:id").get(allowCors(seeingProducts)); // Wrap with allowCors
router.route("/checkout/:id").get(allowCors(checkoutProduct)); // Wrap with allowCors
router.route("/gettingDataForCheckout").post(allowCors(gettingUserDataForCheckout)); // Wrap with allowCors
router.route("/sendingemail/:email").post(allowCors(sendingemail)); // Wrap with allowCors
router.route("/addingToWishlist/:id").post(isAuthenticated, allowCors(addToWishlist)); // Wrap with allowCors
router.route("/removeFromWishlist/:id").post(isAuthenticated, allowCors(removeFromWishlist)); // Wrap with allowCors

export default router;
