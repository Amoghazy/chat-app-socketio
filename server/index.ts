import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/DataBaseConnect";
import router from "./routes";
import { app, server } from "./socket/indext";

dotenv.config();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use((err: any, req: any, res: any, next: any) => {
  console.log(err.message + " err middelware ");
  res.status(err.statusCode || 500).json({
    status: err.statusText || "Failed",
    error: true,
    message: err.message,
  });
});
connectDB().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
});
