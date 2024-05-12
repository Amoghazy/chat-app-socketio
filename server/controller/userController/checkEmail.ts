import User from "../../models/userModel";
import createError from "../../utils/createError";
import handelError from "../../utils/wrapError";
import { Request, Response } from "express";

const checkEmail = handelError(
  async (req: Request, res: Response, next: any) => {
    const { email }: { email: string } = req.body;
    const userExists = await User.findOne({ email }).select("-password");
    if (!userExists) {
      return next(createError.createError(400, "User not found"));
    }
    return res.status(200).json({ message: "Welcome back", data: userExists });
  }
);
export default checkEmail;
