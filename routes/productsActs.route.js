import express from "express"
import { addToWishlist, checkoutProduct, gettingUserDataForCheckout, removeFromWishlist, seeingProducts, sendingemail } from "../controllers/productActs.controller.js"
import { isAuthenticated } from "../middlewares/authenticated.js"

const router = express.Router()

router.route("/details/:id").get(seeingProducts)
router.route("/checkout/:id").get(checkoutProduct)
router.route("/gettingDataForCheckout").post(gettingUserDataForCheckout)
router.route("/sendingemail/:email").post(sendingemail)
router.route("/addingToWishlist/:id").post(isAuthenticated,addToWishlist)
router.route("/removeFromWishlist/:id").post(isAuthenticated,removeFromWishlist)
export default router