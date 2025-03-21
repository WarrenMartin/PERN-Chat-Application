import express from 'express';
import {login, logout, signup,getMe} from "../controllers/auth.controller.js"
import protectRoute from '../middelware/protectRoute.js';
const router=express.Router();


// <URL>/api/auth/signup
// @ts-ignore 
router.post("/signup",signup)

// @ts-ignore 
router.get("/me",protectRoute,getMe)

// @ts-ignore
router.post("/login",login)

router.post("/logout",logout)


export default router;