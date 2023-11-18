import { Schema, model } from "mongoose";
import Joi from "joi";

const contactSchema = new Schema({
   name: {
      type: String,
      required: [true, "Set name for contact"],
   },
   email: {
      type: String,
   },
   phone: {
      type: String,
   },
   favorite: {
      type: Boolean,
      default: false,
   },
});

export const contactAddSchema = Joi.object({
   name: Joi.string().required().messages({
      "any.required": `missing required "name" field`,
   }),
   email: Joi.string().email().required().messages({
      "any.required": `missing required "email" field`,
   }),
   phone: Joi.string().required().messages({
      "any.required": `missing required "phone" field`,
   }),
   favorite: Joi.boolean(),
});

export const updContactSchema = Joi.object({
   name: Joi.string(),
   email: Joi.string().email(),
   phone: Joi.string(),
   favorite: Joi.boolean(),
});

export const contactFavoriteSchema = Joi.object({
   favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

export default Contact;
