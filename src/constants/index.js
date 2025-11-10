import path from "node:path";
import fs from "node:fs/promises";
import { env } from "../utils/env.js";


export const FIFTEEN_MINUTES = 1000 * 60 * 15;
export const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;

export const SORT_ORDER = {
  asc: "asc",
  desc: "desc",
};

export const SMTP = {
  SMTP_SERVER: "SMTP_SERVER",
  SMTP_PORT: "SMTP_PORT",
  SMTP_LOGIN: "SMTP_LOGIN",
  SMTP_PASSWORD: "SMTP_PASSWORD",
  SMTP_FROM: "SMTP_FROM",
};

export const TEMPLATE_DIR = path.join(process.cwd(), "src", "templates");

export const TEMPLATE_UPLOAD_DIR = path.join(process.cwd(), "temps");
export const UPLOAD_DIR = path.join(process.cwd(), "uploads");

export const CLOUDINARY = {
  CLOUDINARY_CLOUD_NAME: "CLOUDINARY_CLOUD_NAME",
  CLOUDINARY_API_KEY: "CLOUDINARY_API_KEY",
  CLOUDINARY_API_SECRET: "CLOUDINARY_API_SECRET",
};

export const APP_DOMAIN = env("APP_DOMAIN");
