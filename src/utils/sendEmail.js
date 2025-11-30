import nodemailer from "nodemailer";
import { SMTP } from "../constants/index.js";

const transporter = nodemailer.createTransport({
  host: SMTP.SMTP_SERVER,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP.SMTP_LOGIN,
    pass: SMTP.SMTP_PASSWORD,
  },
});

export const sendEmail = async (options) => {
  try {
    console.log("Sending email with options:", options);
    console.log("SMTP CONFİG:", {
      host: SMTP.SMTP_SERVER,
      port: 465,
      secure: false, // true for 465, false for other ports
      auth: {
        user: SMTP.SMTP_LOGIN,
        pass: SMTP.SMTP_PASSWORD,
      },
    });
    const result = await transporter.sendMail(options);

    console.log("Message sent:", result.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    console.error("Error message:",error.message);
    console.error("error code",error.code);
    console.error("error response",error.response);
    throw error;
  }
};
