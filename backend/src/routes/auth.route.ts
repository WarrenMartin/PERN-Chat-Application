import express from 'express';
import {login, logout, signup} from "../controllers/auth.controller.js"
const router=express.Router();


// <URL>/api/auth/signup
router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)



export default router;



