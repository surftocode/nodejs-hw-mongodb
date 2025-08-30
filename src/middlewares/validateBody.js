import Joi from "joi";
export const validateBody = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
      errors: {
        wrap: {
          label: false,
        },
      },
    });
    if (error) {
      return res.status(400).json({
        message:"Validation error",
        details:error.map(d=>d.message),
          })
    }
    req[property]=value;
    next();
   
  };
};
