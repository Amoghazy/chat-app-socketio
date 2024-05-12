import User from "../../models/userModel";
import createError from "../../utils/createError";
import handelError from "../../utils/wrapError";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const checkPassword = handelError(
  async (req: Request, res: Response, next: any) => {
    const { password, userId }: { password: string; userId: string } = req.body;
    const user = await User.findById(userId);

    const isPasswordCorrect = await bcrypt.compare(password, user?.password!);
    if (!isPasswordCorrect) {
      return next(createError.createError(400, "Password is incorrect"));
    }
    const tokenData = {
      userId: user?._id,
      email: user?.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, { httpOnly: true, secure: true })
      .json({
        message: "Password is correct",
        token,
      });
  }
);
export default checkPassword;
