import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import User from "../db/models/user.js";
import Session from "../db/models/session.js";
import { randomBytes } from "crypto";
import {
  FIFTEEN_MINUTES,
  ONE_MONTH,
  TEMPLATE_DIR,
} from "../constants/index.js";
import jwt from "jsonwebtoken";
import { env } from "../utils/env.js";
import { sendEmail } from "../utils/sendEmail.js";
import handlebars from "handlebars";
import path from "node:path";
import fs from "node:fs/promises";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (payload) => {
  console.log("incoming payload:", payload);
  payload.email = payload.email.trim().toLowerCase();
  const existingUser = await User.findOne({ email: payload.email });
  console.log("user var:", existingUser);
  if (existingUser) throw createHttpError(409, "Email has already been added");

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return User.create({
    ...payload,
    password: encryptedPassword,
  });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");
  const accessTokenValidUntill = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntill = new Date(Date.now() + ONE_MONTH);

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntill,
    refreshTokenValidUntill,
  };
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw createHttpError(401, "User cannot found");
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) throw createHttpError(401, "Invalid password");

  await Session.deleteOne({
    userId: user._id,
  });
  const sessionData = createSession();

  const session = await Session.create({
    ...sessionData,
    userId: user._id,
  });

  return { user, session };
};

export const refreshTokenSession = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, "session is not exist");
  }
  const isSessionExpired =
    new Date() > new Date(session.refreshTokenValidUntill);
  if (isSessionExpired) {
    throw createHttpError(401, " Token is expired.");
  }

  await Session.deleteOne({
    _id: sessionId,
    refreshToken,
  });
  const newSession = createSession();

  return Session.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutService = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

export const requestResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, "User is not exist!");
  }
  console.log("User found!", user);

  const resetToken = jwt.sign(
    {
      data: user._id.toString(),
      email: user.email,
    },
    env("JWT_SECRET"),
    {
      expiresIn: "1h",
    }
  );

  console.log("Token oluşturuldu.")
  const html = await fs.readFile(
    "reset-password-email.html",
    "utf-8",
    (err, data) => {
      if (err) {
        console.log("Error reading file:", err);
        return;
      }
      return data;
    }
  );

  const emailLink = handlebars.compile({
    name: user.name,
    link: `${env("APP_DOMAIN")}/reset-password?token=${resetToken}`,
  });
  console.log("📧 sendEmail çağrılıyor...");
  await sendEmail({
    from: env("SMTP_FROM"),
    to: user.email,
    subject: "Reseting Password",
    text: "Change your password", // plain‑text body
    html: html, // HTML body
  });
  console.log("Email has send to:", user.email);
};

// export const requestResetToken = async (email) => {
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw createHttpError(404, "User could not found");
//   }
//   

//   const resetToken = jwt.sign(
//     {
//       data: user._id.toString(),
//       email: user.email,
//     },
//     env("JWT_SECRET"),
//     {
//       expiresIn: "1h",
//     }
//   );
//   console.log("Token oluşturuldu:", resetToken);

//   const resetPasswordTemplatePath = path.join(
//     TEMPLATE_DIR,
//     "reset-password-email.html"
//   );

//   const templateSource = (
//     await fs.readFile("reset-password-email.html", "utf-8")
//   ).toString();

//   const template = handlebars.compile(templateSource);
//   const html = template({
//     name: user.name,
//     link: resetPasswordTemplatePath,
//   });
//   console.log("📧 sendEmail çağrılıyor...");
//   await sendEmail({
//     from: env("SMTP_FROM"),
//     to: user.email,
//     subject: "Şifre sıfırlama ekranı ✔",
//     text: "Şifreni sıfırlamak mı istiyorsun?", // plain‑text body
//     html,
//   });
//   console.log("email gönderildi to:", user.email);
// };

export const resetPassword = async (payload) => {
  let entries;

  entries = jwt.verify(payload.token, env("JWT_SECRET"));
  const user = await User.findOne({
    email: entries.email,
    _id: entries.data,
  });
  if (!user) {
    throw createHttpError(404, "User could not found");
  }
  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  await User.updateOne({ _id: user._id }, { password: encryptedPassword });
  await Session.deleteMany({ userId: user._id });
};
