import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"],
    },
    zipCode: { type: String, required: [true, "zipCode is required"] },
    service_info: {
      type: String,
      required: [true, "Please provide your service information"],
    },
    attachment: { type: String, required: [true, "Please provide your attachment"]},
    
  },
  { timestamps: true }
);

export const serviceModel = mongoose.model("service", serviceSchema);
