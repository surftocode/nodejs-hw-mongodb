import nodemailer from "nodemailer";
import { SMTP } from "../constants/index.js";

const transporter = nodemailer.createTransport({
  host: SMTP.SMTP_SERVER,
  port: 587,
  secure: false,
  auth: {
    user: SMTP.SMTP_LOGIN,
    pass: SMTP.SMTP_PASSWORD,
  },
});

export const sendEmail = async (options) => {
  try {
    const result = await transporter.sendMail(options);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
