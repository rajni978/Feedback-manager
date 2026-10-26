import Feedback from "../models/Feedback.js";

// CREATE feedback
export const createFeedback = async (req,res) => {

    try {
        const feedback =  new Feedback(req.body);

        await feedback.save();

        res.status(201).json({
            message:"Feedback saved successfully",
            feedback:feedback
        });
    }catch(error){
      res.status(400).json({
        message:"Failed to save Feedback",
        error:error.message
      });
    }
};

// Get all feedback

export const getAllFeedback = async(req,res) => {

    try {

        const feedbacks = await Feedback.find();

        res.status(200).json({
            message:"Fetched successfully",
            feedbacks
        });

    }catch(error){
        res.status(400).json({
            message:"Failed to fetch feedbacks",
            error:error.message
        });

    }
};

// GET one feedback

export const getFeedbackById = async(req,res) => {

    try{
        const feedback = await Feedback.findeById(req.params.id);

        if(!feedback){
            return res.status(404).json({
                message:"Feedback not found"
            });
        }
        res.status(200).json(feedback);
    }catch(error){

        res.status(400).json({
            message:"Failed to fetch feedback",
            error:error.message
        });
    }
};

export const updateFeedback= async(req,res) => {

    try{
        const feedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        );
           if (!feedback) {

            return res.status(404).json({
                message: "Feedback not found"
            });

        }

        res.status(200).json({
            message: "Feedback updated successfully",
            feedback: feedback
        });

        
    }catch(error){

          res.status(400).json({
            message: "Failed to update feedback",
            error: error.message
        });
    }
};

// Delete feedback 

export const deleteFeedback = async(req,res) => {

    try{
        const feedback = await Feedback.findByIdAndDelete(
            req.params.id,
        
        );

          if (!feedback) {

            return res.status(404).json({
                message: "Feedback not found"
            });

        }

        res.status(200).json({
            message: "Feedback deleted successfully"
        });

    }catch(error){
            res.status(500).json({
            message: "Failed to delete feedback",
            error: error.message
        });
    }
};