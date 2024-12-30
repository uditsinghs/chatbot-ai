import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to Db");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};