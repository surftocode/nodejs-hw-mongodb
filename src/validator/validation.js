import Joi from "joi";

// import { isValidObjectId } from "mongoose";

export const createContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required().trim().messages({
    "string.base": "Name should be a string",
    "string.min": "Name should be at least 3 characthers",
    "string.max": "Name should be at most 20 characthers",
  }),
  phoneNumber: Joi.string().required().trim().messages({
    "string.base": "Phone number should be a number",
  }),
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "Email must be a valid email",
    }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid("work", "home", "personal")
    .required()
    .trim()
    .messages({
      "string.base": "Contact type must be a string",
      "any.required": "Contact type is required",
    }),
  createdAt: Joi.date(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().trim().messages({
    "string.min": "Name should be at least 3 characthers",
    "string.max": "Name should be at most 20 characthers",
  }),
  phoneNumber: Joi.string().required().messages({
    "string.base": "Phone number should be a number",
  }),
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "Email must be a valid email",
    }),
  isFavourite: Joi.boolean().required(),
  createdAt: Joi.date(),
}).min(1);
