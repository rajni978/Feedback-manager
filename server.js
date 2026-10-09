import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Feedback from "./models/Feedback.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

app.post("/feedback", async (req, res) => {

    try {

        const feedback = new Feedback(req.body);

        await feedback.save();

        res.status(201).json({
            message: "Form is submitted successfully",
            feedback: feedback
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to save the form",
            error: error.message
        });
    }
});


app.get("/feedback", async (req, res) => {

    try {

        const feedback = await Feedback.find();

        res.json(feedback);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch the submitted feedback",
            error: error.message
        });
    }
});


async function connectDB() {

    try {

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected successfully");

    } catch (error) {

        console.log("Failed to connect MongoDB");
        console.error(error);
    }
}


connectDB();


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

