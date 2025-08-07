import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo connection successfully established!");
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};
