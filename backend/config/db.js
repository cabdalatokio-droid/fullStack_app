import mongoose from "mongoose";
import { dbURL } from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);

    console.log(`MongoDB connected successfully${dbURL}`);
  } catch (error) {
    console.log(`MongoDB connection failed ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;