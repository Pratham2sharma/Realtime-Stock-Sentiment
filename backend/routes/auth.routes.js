import express from "express";

import { getProfile, getUsersByEmail, login, logout, refreshToken, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";



const router = express.Router();

router.post("/signup" , signup);
router.post("/login" , login);
router.post("/logout", logout);
router.post("/refresh-token" , refreshToken);
router.get("/profile" ,protectRoute ,  getProfile);
router.get("/users", getUsersByEmail);


export default router;