import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const conn = mongoose.connection;

    conn.on("connected", () => {
      console.log("MongoDB connected");
    });

    conn.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });
    conn.on("error", (error) => {
      throw new Error(error);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDB;
