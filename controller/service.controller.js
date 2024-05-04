import { serviceSchema_validation } from "../Schema_validation/serviceSchema.validation.js";
import { serviceModel } from "../model/service.model.js";
import nodemailer from "nodemailer";


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


export const fetchServices = async (req, res) => {
  const zipCode = req.params.zipCode;
  const userId = req.params.id;
  try {
       const services = await serviceModel.find({
         zipCode,
         userId: { $ne: userId },
       });
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

// ----- sending an email to service poster -------
export const sendEmailQuery = async (req, res) => {
  const { sender, reciever, subject, body } = req.body;
  console.log("req.body: ", req.body);
  // Create a transporter object.
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hikmatkhanbangash@gmail.com",
      pass: "lzlj nvhl opos neir",
    },
  });
  const mailOptions = {
    from: sender,
    to: reciever,
    subject: subject,
    html: `
    ${body}
    <br />
    <br />
    <p>The sender of this email is: <strong>${sender}</strong>, you can email your query to this email address </p>
    
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        status: 500,
        error: error,
        message: "Something went wrong!",
      });
    } else {
      console.log("Email sent!");
      res.status(200).json({
        success: true,
        status: 200,
        message: "email send successfully!",
      });
    }
  });
};