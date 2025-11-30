import nodemailer from "nodemailer";
import { SMTP } from "../constants/index.js";

const transporter = nodemailer.createTransport({
  host: SMTP.SMTP_SERVER,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP.SMTP_FROM,
    pass: SMTP.SMTP_PASSWORD,
  },
});

export const sendEmail = async (options) => {
  const result = await transporter.sendMail(options);

  console.log("Message sent:", result.messageId);
};
