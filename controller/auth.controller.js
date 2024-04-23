import bcrypt from "bcryptjs";
import { userModel } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import { SignIn_validate, SignUp_validate } from "../Schema_validation/auth.validation.js";
import dotenv from "dotenv";
dotenv.config();


export const SignUp = async (
 req, res
) => {
  // first we need to validate the data before saving it in DB
  const { error } = SignUp_validate(req.body);
  if (error) return res.send(error.details[0].message);

  console.log(req.body);
  const { name, email, password } = req.body;
  // encrypt password by using bcrypt algorithm
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const verifyEmail = await userModel.findOne({ email });

    //checking EMAIL VALIDATION / DUPLICATION
    if (!verifyEmail) {
      const createUser = new userModel({
          name: name,
          email: email,
        password: hash,
      });
      await createUser.save();
      const token = jwt.sign(
        {
          name: name,
          email: email,
        },
        "token_secret_key"
      );
      res.status(200).json({success: true, status: 200, data: createUser, token: token});
    } else {
      res.status(400).json({success: false, status: 400, data: "email address has already registered!" });
    }
  } catch (err) {
    // next(err);
    res.status(500).json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

// ----- sign in -----
export const SignIn = async (
 req, res
) => {
  // first we need to validate the data before saving it in DB
  const { error } = SignIn_validate(req.body);
  if (error) return res.status(400).json({message: error.details[0].message, success: false, status: 400});
  console.log(req.body);
  try {
    const User= await userModel.findOne({ email: req.body.email });
    if (!User)
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User is not found!",
      });
    //   now checking password
    const isCorrect = await bcrypt.compare(
      req.body.password,
      User.password
    );
    // if the password is wrong.
    if (!isCorrect)
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Password is incorrect",
      });

    
    const token = jwt.sign(
      {
        id: User._id,
        name: User.name,
        email: User.email,
      },
      "token_secret_key"
    );

    const { password, ...detail } = User._doc;
    res
      .status(200)
      .json({
        success: true,
        status: 200,
        data: detail,
        token: token,
      });
  } catch (error) {
    next(error);
  }
};

// ----- Email Verification -----
export const emailVerification = async (req, res) => {
  const { email, OTP } = req.body;
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
    from: "hikmatkhanbangash@gmail.com",
    to: email,
    subject: "Email verification",
    html: `
    <p>Thank you for taking the time to register with us! To ensure the security of your account and the integrity of our platform, we require a quick verification step.</p>
     
    <p>Your One-Time Passcode (OTP) to verify your email is: <strong>${OTP}</strong>  </p>
    
    <p>Please enter this code in the verification field on our website to confirm your email address.</p>
    
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

