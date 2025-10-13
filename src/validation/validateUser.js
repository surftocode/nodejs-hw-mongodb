import Joi from "joi";
export const validateBody = (schema) => (req, res, next) => {
  Joi.object({
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
  });

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "validasyn hatası",
      errors: error.details.map((e) => {
        e.message;
      }),
    });
  }
  next();
};
