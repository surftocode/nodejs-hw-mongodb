import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY } from "../constants/index.js";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: CLOUDINARY.CLOUDINARY_NAME,
  api_key: CLOUDINARY.CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY.CLOUDINARY_API_SECRET,
});

export const saveFileToCloudinary = async (file) => {
  const uploadResult = await cloudinary.uploader.upload(file.path);

  await fs.unlink(file.path);
  return uploadResult.secure_url;
};
