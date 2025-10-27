import createHttpError from "http-errors";
import Session from "../db/models/session.js";
import User from "../db/models/user.js";

export const authenticate = async (req, res, next) => {
  console.log('🔐 AUTH: Starting authentication...');
  console.log('🔐 AUTH: Headers:', req.headers.authorization);
  try {
    const authHeader = req.headers.authorization;
  if (!authHeader) {
console.log("Auth no header");
     next(createHttpError(401, "Authorization header is missing"));
    return;
  }
  const bearer = authHeader.split(" ")[0];
  const token = authHeader.split(" ")[1];
  console.log("Auth bearer", bearer);
  console.log("Auth token",token);

  if (bearer !== "Bearer" || !token) {
    console.log("Auth invalid format")
    next(createHttpError(401, "Invalid Authorization header format"));

    return;
  }
  const session = await Session.findOne({
    accessToken: token,
  });
  console.log("Auth session found",session)

  if (!session) {
    console.log("auth session not found")
    next(createHttpError(401, "Invalid access token"));
    return;
  }
  const isSessionExpired =
    new Date() > new Date(session.accessTokenValidUntill);

  if (isSessionExpired) {
    next(createHttpError(401, "Access token has expired"));
    return;
  }
  const user = await User.findOne({ _id: session.userId });
  if (!user) {
    next(createHttpError(401, "User not found"));
    return;
  }
  req.user = user;
  next();
};
  } catch (error) {
    
  }
  
