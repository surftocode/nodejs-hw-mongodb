import createHttpError from "http-errors";

const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      const validateContact = await schema.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      req.body = validateContact;
      next();
    } catch (err) {
      const errors = err.details.map((d) => {
        d.message;
      });
      next(createHttpError(400, "Bad Request: " + errors));
    }
  };
};

export default validateBody;
