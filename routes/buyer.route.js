import express from "express";
import { editProfile, login, signup } from "../controllers/buyer.controller.js";
import { isAuthenticated } from "../middlewares/authenticated.js";
import allowCors from "../allowcors.js"; // Import allowCors

const router = express.Router();

router.route("/signup").post(allowCors(signup)); // Wrap with allowCors
router.route("/login").post(allowCors(login)); // Wrap with allowCors
router.route("/editProfile/").post(isAuthenticated, allowCors(editProfile)); // Wrap with allowCors

export default router;
