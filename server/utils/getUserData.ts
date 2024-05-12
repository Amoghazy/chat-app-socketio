import jwt from "jsonwebtoken";
import User from "../models/userModel";

export default async function getUserData(token: string) {
  try {
    if (!token) {
      return {
        error: "Token not found",
        message: "Session has expired. Please log in again.",
        status: 401,
      };
    }

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decodedToken.userId) {
      return {
        error: "Invalid token",
        message: "Token verification failed. Please log in again.",
        status: 401,
      };
    }

    const userData = await User.findById(decodedToken.userId).select(
      "-password -__v -updatedAt"
    );

    if (!userData) {
      return {
        error: "User not found",
        message: "User data not found in the database.",
        status: 404,
      };
    }

    return userData;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return {
        error: "Token expired",
        message: "Session has expired. Please log in again.",
        status: 401,
      };
    } else {
      return {
        error: "Internal server error",
        message: "An unexpected error occurred. Please try again later.",
        status: 500,
      };
    }
  }
}
