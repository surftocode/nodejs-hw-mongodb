import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const initMongoConnection = async () => {
  try {
    const URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(URI);
    console.log("Mongo connection successfully established!");
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};
