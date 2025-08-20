import dotenv from "dotenv";
dotenv.config({ debug: false });
import mongoose from "mongoose";

export const initMongoConnection = async () => {
  try {
    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/?retryWrites=true&w=majority&appName=Cluster0`;
    console.log(uri);
    await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB_NAME,
    });
    console.log("Mongo connection successfully established!");
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};
