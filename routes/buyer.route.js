import express from "express"
import { editProfile, login, signup } from "../controllers/buyer.controller.js"
import { isAuthenticated } from "../middlewares/authenticated.js"

const router = express.Router()

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/editProfile/").post(isAuthenticated,editProfile)
export default router