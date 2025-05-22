import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";

/** @desc Register a user */
/** @access public
/** @route POST /api/users/register */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, password } = req.body;
  if (!name || !phone || !password) {
    res.status(400);
    throw new Error("All fields are mandetory");
  }

  const userAvailable = await userModel.findOne({ phone });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered with that phone number!");
  }

  //Hashed password

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    name,
    phone,
    password: hashedPassword,
  });
  console.log("user is created: ", user);
  if (user) {
    res.status(201).json({ _id: user.id, name: user.name });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the new user!" });
});

/** @desc login user */
/** @access public
/** @route POST /api/users/login */
export const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    res.status(400);
    throw new Error("All fields are mandetory");
  }

  const user = await userModel.findOne({ phone });

  //compare password with hashedPassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          phone: user.phone,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new error("Phone or password is not valid");
  }
});

/** @desc Current info of the user */
/** @access private
/** @route GET /api/users/current */
export const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
