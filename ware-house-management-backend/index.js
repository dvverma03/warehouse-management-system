import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
    });

app.use(cors({
  origin: ["http://localhost:3000", "https://assignment-lavitation-frontend.vercel.app"],
  credentials: true
}));

// Basic settings to handle data
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Route imports
import userRouter from './routes/user.routes.js';

// Route declarations
app.use("/api/v1/users", userRouter);

export { app };
