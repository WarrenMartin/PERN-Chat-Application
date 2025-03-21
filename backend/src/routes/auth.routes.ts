import express from 'express';
import {login, logout, signup,getMe} from "../controllers/auth.controller.js"
import protectRoute from '../middelware/protectRoute.js';
const router=express.Router();


// <URL>/api/auth/signup
// @ts-ignore - Suppress type checking for this line
router.post("/signup",signup)

// @ts-ignore - Suppress type checking for this line
router.get("/me",protectRoute,getMe)

// @ts-ignore - Suppress type checking for this line
router.post("/login",login)

router.post("/logout",logout)



export default router;