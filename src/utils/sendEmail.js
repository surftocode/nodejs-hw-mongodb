import nodemailer from 'nodemailer';
import {SMTP} from '../constants/index.js';
import {env} from '../utils/env.js';



const transporter= nodemailer.createTransport({
    host:env(SMTP.SMTP_SERVER),
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:env(SMTP.SMTP_LOGIN),
      pass: env(SMTP.SMTP_PASSWORD),
    },
  });

  export const sendEmail=async (options)=>{
    const result=await transporter.sendMail(options);
    return result;
        
 

  }