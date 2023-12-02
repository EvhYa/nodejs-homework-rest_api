import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";

import Jimp from "jimp";

import User from "../models/User.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";
import Contact from "../models/contacts.js";

const { JWT_SECRET } = process.env;
const avatarPath = path.resolve("public", "avatars");

const register = async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   if (user) {
      throw HttpError(409, "Email in use");
   }

   const gravatarUrl = gravatar.url(email);

   const hashPassword = await bcrypt.hash(password, 10);
   const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL: gravatarUrl });
   res.status(201).json({
      user: {
         email: newUser.email,
         subscription: "starter",
         avatarURL: newUser.avatarURL,
      },
   });
};

const login = async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   if (!user) {
      throw HttpError(401, "Email or password is wrong");
   }
   const passwordCompare = await bcrypt.compare(password, user.password);
   if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
   }
   const payload = {
      id: user._id,
   };
   const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
   await User.findByIdAndUpdate(user._id, { token });

   res.json({
      token: token,
      user: {
         email: user.email,
         subscription: user.subscription,
      },
   });
};

const logout = async (req, res) => {
   const { _id } = req.user;
   await User.findByIdAndUpdate(_id, { token: "" });
   res.status(204).json();
};

const current = async (req, res) => {
   const { email, subscription } = req.user;
   res.json({
      email: email,
      subscription: subscription,
   });
};

const subcriptionUpd = async (req, res) => {
   const { _id: id, subscription: currentSub } = req.user;
   const { subscription: newSub } = req.body;
   if (currentSub === newSub) {
      res.json({ message: `Subscription plan ${newSub} is already in use` });
   }
   const result = await User.findByIdAndUpdate(id, req.body, { new: true });
   res.json(result);
};

const avatarUpdate = async (req, res) => {
   const { _id: id } = req.user;

   const { path: oldPath, filename } = req.file;

   await Jimp.read(oldPath).then((image) => {
      return image.resize(250, 250).write(`${oldPath}`);
   });

   const newPath = path.join(avatarPath, filename);
   await fs.rename(oldPath, newPath);

   const avatar = path.join("avatars", filename);
   const result = await User.findByIdAndUpdate(id, { avatarURL: avatar }, { new: true });

   res.json({
      avatarURL: avatar,
   });
};

export default {
   register: ctrlWrapper(register),
   login: ctrlWrapper(login),
   logout: ctrlWrapper(logout),
   current: ctrlWrapper(current),
   subcriptionUpd: ctrlWrapper(subcriptionUpd),
   avatarUpdate: ctrlWrapper(avatarUpdate),
};
