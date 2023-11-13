import Joi from "joi";

export const contactSchema = Joi.object({
   name: Joi.string().required().messages({
      "any.required": `missing required "name" field`,
   }),
   email: Joi.string().email().required().messages({
      "any.required": `missing required "email" field`,
   }),
   phone: Joi.string().required().messages({
      "any.required": `missing required "phone" field`,
   }),
});

export const updContactSchema = Joi.object({
   name: Joi.string(),
   email: Joi.string().email(),
   phone: Joi.string(),
});
