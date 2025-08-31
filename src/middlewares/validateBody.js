import {schema} from "../utils/validation.js"

const validateBody=(req,res,next)=>{
  const {error, value}=schema.validate(req.body,{abprtEarly:false});
  if(error){
    return res.status(400).json({
      message:"validation error",
      details:validatedData.error.details.map(d=>{d.message})
    })
  }
  req.body=value;
  next();
}

export default validateBody;