import catchAsync from "../utils/catchAsync.js";
import bcrypt from "bcrypt";
const { hashSync } = bcrypt;

import userModel from "../model/userModel.js";

import { hash, check } from "../utils/crypt.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

// const emailSent = (link, email, name) => {
//   const output = `
//     <div style="{background-color: red;">
// <h2 style="{color: #f57224};"><span style="background-color: #ffffff; color: #7367f0;"><strong>Hi, ${name}</strong></span></h2>
// <p>Click the link to reset the password:</p>
// <div style="{background-color: red; height: 500px};">
// <a href=${link} style={cursor:pointer;}>
//  <button style="background-color: #7367f0; border-radius: 1.3rem; padding: 1rem; border: none; color: white; text-decoration: none;"> Confirm your email
//  </button>
//  </a>
//  </div>
// <h3>Thanks!!</h3>
// <p>The WB Basic-FIT Team</p>
// </div>
//     `;
//   var transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // use SSL
//     service: "gmail",
//     auth: {
//       user: "rafaymuhammad245@gmail.com",
//       pass: "ptcanmqgfakfebam",
//     },
//   });

//   var mailOptions = {
//     from: "rafaymuhammad245@gmail.com",
//     to: email,
//     subject: "Reset Password Link",
//     // template: 'mail'
//     // text: `Hi, ${name} Click the link to complete the verification:
//     //     ${link}`,
//     html: output,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       res.send("reset link send ");
//       console.log("Email sent: " + info.response);
//       const result = "Email sent: ";
//       return result;
//     }
//   });
// };

export const SignUp = catchAsync(async (req, res, next) => {
  // console.log(req.body);
  let { email, name, password, role } = req.body;

  // const isUsernameUnique = await userModel.findOne({ username });
  // if (isUsernameUnique) {
  //   console.log("username already");
  //   return res.status(400).json({
  //     success: false,
  //     status: 400,
  //     type: "username",
  //     message: "Username already exists",
  //   });
  // }

  const isEmailUnique = await userModel.findOne({ email });
  if (isEmailUnique) {
    return res.status(400).json({
      success: false,
      status: 400,
      type: "email",
      message: "Email already exists",
    });
  }
  password = hashSync(password, 10);
  const userData = {
    name: name,
    email: email,
    password: password,
    role: role,
  };
  if (role.toLowerCase() === "superadmin") {
    const user = await userModel.create(userData);
    if (!user) {
      return res.status(500).json({
        success: false,
        status: 500,
        message: "User could not be added",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "700h" }
    );

    return res.json({
      success: true,
      status: 200,
      message: "User signed up successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        token,
      },
    });
  } else {
    return res.status(400).json({ message: "only superadmin can sign up" });
  }
});
export const login = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (!user)
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Invalid credentials",
    });

  if (!check(password, user.password))
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Invalid credentials",
    });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "700h" }
  );

  return res.status(200).json({
    success: true,
    status: 200,
    message: "User logged in successfully",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      token,
    },
  });
});
export const createUser = async (req, res) => {
  try {
    const { name, email, numberOfStores } = req.body;
    let password = hashSync("12345", 10);
    const userObj = await userModel.findOne({ email: email });
    if (userObj != null) {
      return res.status(400).json({ message: "user already exists" });
    }
    const user = await userModel.create({
      name: name,
      email: email,
      numberOfStores: numberOfStores,
      password: password,
      role: "user",
    });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ err });
  }
};
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({ role: "user" });
    if (users.length) {
      res.status(200).json({ users });
    } else {
      res.status(404).json({ message: "no users found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};
