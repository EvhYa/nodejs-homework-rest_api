import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   if (user) {
      throw HttpError(409, "Email in use");
   }
   const hashPassword = await bcrypt.hash(password, 10);
   const newUser = await User.create({ ...req.body, password: hashPassword });
   res.status(201).json({
      user: {
         email: newUser.email,
         subscription: "starter",
      },
   });
};

export default {
   register: ctrlWrapper(register),
};
