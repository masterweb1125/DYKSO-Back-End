import { serviceSchema_validation } from "../Schema_validation/serviceSchema.validation.js";
import { serviceModel } from "../model/service.model.js";
import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);



export const addService = async (req, res) => {
    // first we need to validate the data before saving it in DB
    console.log(req.body); 
  // const { error } = serviceSchema_validation(req.body);
  // if (error) return res.send(error.details[0].message);

  try {
      const createService = new serviceModel(req.body);
      await createService.save();
      res.status(200).json({ success: true, message: "service added successfully", service:createService });

  } catch (err) {
    console.log("service created error: ", err.message)
    res.status(500).json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

// fetching all services 
export const fetchServices = async (req, res) => {
  const userId = req.params.id;
  try {
    // const services = await serviceModel.find({ userId: { $ne: userId } });
     const services = await serviceModel.find();
     res;
    res
      .status(200)
      .json({
        success: true,
        data: services,
      });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

// fetching services based on zipCode
export const fetchZipCodeServices = async (req, res) => {
  const zipCode = req.params.zipCode;
  const userId = req.params.id;
  try {
    const services = await serviceModel.find({zipCode, userId: { $ne: userId } });
    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

// fetching single service data based on ID
export const fetchSingleService = async (req, res) => {
  const Id = req.params.id;
  try {
    const services = await serviceModel.findById(Id);
    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err,
    });
  }
};


// sending an email to the customer
export const sendEmailQuery = async (req, res) => {
  const { sender, reciever, subject, body } = req.body;
  console.log("req.body: ", req.body);
  const SenderEmail = "engrhikmatbangash@gmail.com";

  const msg = {
    from: SenderEmail,
    to: reciever,
    subject: subject,
    html: `
    ${body}
    <br />
    <br />
    <p>The sender of this email is: <strong>${sender}</strong> </p> <p>
    you can reply to this email address </p> 
    
  `,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent successfully"),
        res.status(200).json({
          success: true,
          message: "send a customer email successfully",
        });
    })
    .catch((error) => {
      console.error(error.toString());
      res.status(500).json({
        success: false,
        message: "email sending failed",
        error: error,
      });
    });
};