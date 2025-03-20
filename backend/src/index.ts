// backend/src/index.ts
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv"


const app=express()

app.use(express.json()); // is a middleware that parses incoming JSON requests, allowing req.body to be accessible in Express.

app.use("/api/auth",authRoutes) // login-signup and signout
app.use("/api/messages",messageRoutes) // send messages receieive messages

app.listen(5001,()=>{
    console.log("Server is running on port 5000")
})


// Why /api/auth?
// REST API Best Practice

// /api/ prefix indicates that these routes belong to an API (helps in structuring endpoints).
// auth refers to authentication-related routes (e.g., login, signup, logout).
// Keeps Code Modular

// Instead of defining all routes in index.ts, we separate authentication routes in auth.route.ts.
// This makes code cleaner and easier to manage.
