import Joi from "joi";
export const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "validasyn hatası",
      errors: error.details.map((e) => e.message),
    });
  }
  req.body=value;
  next();
};
