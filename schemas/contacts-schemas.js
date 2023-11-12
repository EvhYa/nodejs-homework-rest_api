import Joi from "joi";

export const contactSchema = Joi.object({
   name: Joi.string().required(),
   email: Joi.string().email().required(),
   phone: Joi.string().required(),
});

export const updContactSchema = Joi.object({
   name: Joi.string(),
   email: Joi.string().email(),
   phone: Joi.string(),
});
