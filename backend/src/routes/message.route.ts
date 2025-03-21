import express from "express";
import protectRoute from "../middelware/protectRoute.js";
import { sendMessage } from "../controllers/message.controller.js";


const router=express.Router();

// @ts-ignore
router.post("/send/:id",protectRoute,sendMessage)

// now to get messages
// @ts-ignore
router.get("/messages/:id",protectRoute)



export default router;