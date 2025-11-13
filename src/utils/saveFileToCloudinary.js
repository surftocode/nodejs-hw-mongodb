import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY } from "../constants/index.js";
import dotenv from "dotenv";

import fs from "fs/promises";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("CLOUDINARY object:", CLOUDINARY);
export const saveFileToCloudinary = async (file) => {
  const uploadResult = await cloudinary.uploader.upload(file.path);

  await fs.unlink(file.path);
  return uploadResult.secure_url;
};
