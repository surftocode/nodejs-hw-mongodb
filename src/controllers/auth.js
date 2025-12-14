import { ONE_MONTH, FIFTEEN_MINUTES } from "../constants/index.js";
import mongoose from "mongoose";

import {
  loginUser,
  registerUser,
  refreshTokenSession,
  logoutService,
  requestResetToken,
} from "../services/auth.js";
import createHttpError from "http-errors";
import { generateAuthUrl } from "../utils/googleOauth2.js";

const setupSession = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + FIFTEEN_MINUTES),
  });
};

export const registerController = async (req, res) => {
  const newUser = await registerUser(req.body);
  console.log("newUser oluşturuldu", newUser._id);

  res.status(201).json({
    success: true,
    status: 201,
    message: "Successfully registered a newUser!",
    data: newUser,
  });
};

export const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createHttpError(400, "Email and password are required"));
  }
  console.log("Incoming payload:", req.body);
  try {
    const { user, session } = await loginUser(req.body);
    console.log("User found:", session);

    setupSession(res, session);

    res.status(200).json({
      status: 200,
      success: true,
      message: "Successfully logged in an newUser!",
      data: {
        accessToken: session.accessToken,
        user: {
          id: user._id,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return next(error);
  }
};

export const refreshTokenController = async (req, res) => {
  const session = await refreshTokenSession({
    sessionId: req.cookies.sessionId,
    resfreshToken: req.cookies.resfreshToken,
  });

  setupSession(res, session);
  res.status(200).json({
    success: true,
    message: "Successfully refreshed a session!",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutService(req.cookies.sessionId);
    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");
    return res.status(204).json({
      success: true,
      message: "Successfully logged out!",
    });
  }
};

export const requestResetEmailController = async (req, res) => {
  console.log("🎯 Reset password request başladı");
  console.log("📧 Email:", req.body.email);
  const email = req.body.email;
  await requestResetToken(email);
  res.status(200).json({
    message: "Reset email sent successfully",
    data: {
      token: res.accessToken,
    },
  });
};

export const resetPasswordController = async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  await resetPassword(req.body.email);
  res.status(200).json({
    message: "your password has been reset successfully",
    data: {},
  });
};

export const getGoogleAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  console.log("Generated Google OAuth2 URL:", url);
  res.status(200).json({
    success: true,
    message: "Google OAuth2 URL generated successfully",
    data: {
      url: {
        url,
      },
    },
  });
};

export const loginOrRegisterGoogleController = async (req, res) => {

  const {code}=req.body;
  if(!code){
    throw createHttpError(400, "Authorization code is required");
  }
  const session = await loginOrRegisterGoogleController(code);
  setupSession(res, session);
  res.json({
    status: 200,
    message: "Successfully logged in or registered via Google OAuth2",
    data: {
      accessToken: session.accessToken,
    },
  });
};
