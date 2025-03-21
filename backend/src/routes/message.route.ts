import express from "express";
import protectRoute from "../middelware/protectRoute.js";
import { sendMessage,getMessages,getUsersForSidebar } from "../controllers/message.controller.js";


const router=express.Router();

// @ts-ignore
router.get("/conversations",protectRoute,getUsersForSidebar)

// @ts-ignore
router.post("/send/:id",protectRoute,sendMessage)



// now to get messages
// @ts-ignore
router.get("/:id",protectRoute,getMessages)





export default router;