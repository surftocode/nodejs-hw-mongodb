import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Your name should be at least 3 characters",
    "string.max": "Your name cannot exceed 20 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "Please enter a valid email",
      "any.required": "Email is required",
    }),
  password: Joi.string().required().min(6).max(20).messages({
    "string.min": "Password should be at least 6 characters",
    "string.max": "Password cannot exceed 20 characters",
    "any.required": "Password is required",
  }),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

export const loginSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().required().messages({
    "string.email": "Please enter a valid email",
  }),
  password: Joi.string().required().messages({
    "String.required": "Password is required",
  }),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.email": "Please enter a valid email",
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required().messages({
    "String.reqired": "Password is required",
  }),
  token:Joi.string().required().messages({
    "String.reqired": "Token is required",
  })
});
