import { OAuth2Client } from "google-auth-library";
import { readFile } from "fs/promises";
import { env } from "./env.js";
import createHttpError from "http-errors";
import path from "path";


const PATH_JSON = path.join(process.cwd(), "google-oauth2.json");

const oauthConfig = JSON.parse(await readFile(PATH_JSON));
const googleOauthClient = new OAuth2Client({
  clientId: env("GOOGLE_OAUTH2_CLIENT_ID"),
  clientSecret: env("GOOGLE_OAUTH2_CLIENT_SECRET"),
  redirectUri: oauthConfig.web.redirect_uris[0],
});

export const generateAuthUrl = async () => {
  return googleOauthClient.generateAuthUrl({
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
  
};

export const validateCode = async (code) => {
  const response =await googleOauthClient.getToken(code);
  console.log("Google OAuth2 response:", response);
  if (!response.tokens.id_token) {
    throw createHttpError(401, "Unauthorized");
  }

  const ticket = await googleOauthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  console.log("Verified ID Token ticket:", ticket);

  return ticket;
};

export const getFullNameFromGoogle = async (payload) => {
  let fullName = "Guest";

  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  }

  return fullName;
};
