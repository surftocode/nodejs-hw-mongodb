import express from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import User from "../db/models/user";
import Session from "../db/models/session";
import { randomBytes } from "crypto";
import { FIFTEEN_MINUTES, ONE_MONTH } from "../constants";

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (user) throw createHttpError(409, "Email in use");
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
  const session = createSession();

  return Session.create({
    ...session,
    userId: user._id,
  });
};

export const refreshToken=
