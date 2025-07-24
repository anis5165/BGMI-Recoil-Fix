import { Schema, model } from "mongoose";

const feedbackSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Feedback = model("Feedbacks", feedbackSchema);
export default Feedback;