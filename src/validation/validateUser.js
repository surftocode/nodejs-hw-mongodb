import Joi from "joi";
export const validateBody = (schema) => {
  Joi.object({
    name: Joi.string().required().min(3).max(20),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().required().min(6).max(20),
  });
  const { error, value } = schema.validate({
    abortEarly: false,
    name: "Your name should ben min 3, max 20 char",
    email: "Please enter a valid email",
    password: "Password should be min 6, max 20 char",
  });
};
