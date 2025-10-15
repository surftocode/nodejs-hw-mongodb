import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import User from "../db/models/user.js";
import Session from "../db/models/session.js";
import { randomBytes } from "crypto";
import { FIFTEEN_MINUTES, ONE_MONTH } from "../constants/index.js";

export const registerUser = async (payload) => {
  console.log("incoming payload:", payload);
  const user = await User.findOne({ email: payload.email });
  console.log("user var",user);
  if (user) throw createHttpError(409, "Email in use");

  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  payload.email = payload.email.trim().toLowerCase();
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
  const session = createSession();

  return Session.create({
    ...session,
    userId: user._id,
  });
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

  const newSession = createSession();

  await Session.deleteOne({
    _id: sessionId,
    refreshToken,
  });

  return Session.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutService = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};
