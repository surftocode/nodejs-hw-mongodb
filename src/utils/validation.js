import Joi from "joi";

import { isValidObjectId } from "mongoose";
export const isValidId = (req, res, next) => {
  const { contactId } = res.params;
  if (!isValidObjectId(contactId)) {
    return res.status(400).json({ message: "Invalid ObjectId" });
  }
  next();
};

export const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required().messages({
    "string.base": "Name should be a string",
    "string.min": "Name should be at least 3 characthers",
    "string.max": "Name should be at most 20 characthers",
  }),
  phoneNumber: Joi.number().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  isFavourite: Joi.boolean().required(),
  createdAt: Joi.date(),
});
