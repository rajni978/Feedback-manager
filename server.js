
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import feedbackRoutes from "./routes/feedbackRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("frontend"));

app.use("/api/feedback", feedbackRoutes);

app.get("/", (req, res) => {
    res.send("Student Feedback API is running");
});

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

connectDB();




