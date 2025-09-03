import { HttpError } from "http-errors";

export const errorHandler = (err, req, res, next) => {
  const status =err.status || err.statusCode;
  if(status){
    return res.status(status).json({
      status,message:err.message,
      
    });
   
  }
  return res.status(500).json({
    status: 500,
    message: "Something went wrong",
  });
  
  }

