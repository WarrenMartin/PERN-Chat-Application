// backend/src/index.ts
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"; // Ensure correct file name
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";


// Configure environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/auth", authRoutes) // login-signup and signout
app.use("/api/messages", messageRoutes) // send messages receive messages

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

// Why /api/auth?
// REST API Best Practice

// /api/ prefix indicates that these routes belong to an API (helps in structuring endpoints).
// auth refers to authentication-related routes (e.g., login, signup, logout).
// Keeps Code Modular

// Instead of defining all routes in index.ts, we separate authentication routes in auth.route.ts.
// This makes code cleaner and easier to manage.
