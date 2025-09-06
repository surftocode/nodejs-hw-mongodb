import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
export const initMongoConnection = async () => {
  try {
    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.p7rntty.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(uri);
    console.log("Mongo connection successfully established!");
    console.log("connection db", mongoose.connection.name);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};
