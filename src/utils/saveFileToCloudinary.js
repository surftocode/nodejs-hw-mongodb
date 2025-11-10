import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY } from "../constants/index.js";
import {env} from "../utils/env.js";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: env(CLOUDINARY.CLOUDINARY_NAME),
  api_key:env( CLOUDINARY.CLOUDINARY_API_KEY),
  api_secret: env(CLOUDINARY.CLOUDINARY_API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const uploadResult = await cloudinary.uploader.upload(file.path);

  await fs.unlink(file.path);
  return uploadResult.secure_url;
};
