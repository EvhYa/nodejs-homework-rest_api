import { Schema, model } from "mongoose";
import Joi from "joi";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const subsTypes = ["starter", "pro", "business"];

const userSchema = new Schema(
   {
      password: {
         type: String,
         required: [true, "Set password for user"],
      },
      email: {
         type: String,
         match: emailRegexp,
         required: [true, "Email is required"],
         unique: true,
      },
      subscription: {
         type: String,
         enum: subsTypes,
         default: "starter",
      },
      token: String,
      avatarURL: String,
   },
   { versionKey: false }
);

export const userRegisterSchema = Joi.object({
   email: Joi.string().pattern(emailRegexp).required(),
   password: Joi.string().min(6).required(),
});

export const userLoginSchema = Joi.object({
   email: Joi.string().pattern(emailRegexp).required(),
   password: Joi.string().min(6).required(),
});

export const userSubscriptionSchema = Joi.object({
   subscription: Joi.string().valid(...subsTypes),
});

const User = model("user", userSchema);

export default User;
