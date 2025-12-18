import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware.js";

// Import Routes
import authRouter from "./routes/auth.routes.js";
import habitRouter from "./routes/habit.routes.js";
import socialRouter from "./routes/social.routes.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Route Declaration
app.use("/api/auth", authRouter);
app.use("/api/habits", habitRouter);
app.use("/api/social", socialRouter);

// Error Middleware (Must be last)
app.use(errorMiddleware);

export { app };