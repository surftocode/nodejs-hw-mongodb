import createHttpError from "http-errors";


const validateBody = (schema) => {
  return async(req,res,next)=>{
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    next();
  } catch (err) {
    const errorDetails = createHttpError(400, "Bad Request", {
      errors: errors,
      status: errorDetails,
    });
    const errors = err.details.map((d) => {
      d.message;
    });
   
  }
  req.body=value;
  next();
}};

export default validateBody;
