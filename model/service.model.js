import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"],
    },
    posterName: {
      type: String,
      required: [true, "Service poster name is required"],
    },
    posterEmail: {
      type: String,
      required: [true, "Please provide Poster email address"],
    },
    profileImage: {
      type: String,
    },
    zipCode: { type: String, required: [true, "zipCode is required"] },
    serviceTitle: { type: String, required: [true, "service is required"] },
    service_info: {
      type: String,
      required: [true, "Please provide your service information"],
    },
    attachment: {
      type: String,
      required: [true, "Please provide your attachment"],
    },
  },
  { timestamps: true }
);

export const serviceModel = mongoose.model("service", serviceSchema);
