import { ONE_MONTH, FIFTEEN_MINUTES } from "../constants/index.js";
import cookie from "cookie-parser";
import {
  loginUser,
  registerUser,
  refreshTokenSession,
  logoutService,
} from "../services/auth.js";

const setupSession = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + FIFTEEN_MINUTES),
  });

  res.status(200).json({
    success: true,
    message: "successfully having new session",
    data: session.accessToken,
  });
};

export const registerController = async (req, res) => {
  const user = await registerUser(req.body);
  console.log("user oluşturuldu", user._id);

  res.status(201).json({
    success: true,
    status: 201,
    message: "Successfully registered a user!",
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  setupSession(res, session);
  res.status(200).json({
    status: 200,
    success: true,
    message: "Successfully logged in an user!",
    data: session,
  });
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
    res.clearCookie(sessionId);
    res.clearCookie(refreshToken);
    return res.status(204);
  }
};
