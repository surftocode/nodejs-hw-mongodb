import dotenv from "dotenv";
dotenv.config({ debug: false });
import mongoose from "mongoose";

export const initMongoConnection = async () => {
  try {
    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.p7rntty.mongodb.net/?retryWrites=true&w=majority`;

    await mongoose.connect(uri);
    console.log("Mongo connection successfully established!");
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};
