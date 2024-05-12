import { Request, Response } from "express";
import handelError from "../../utils/wrapError";
import getUserData from "../../utils/getUserData";
import createError from "../../utils/createError";
import User from "../../models/userModel";

const updateUserDetails = handelError(
  async (req: Request, res: Response, next: any) => {
    const token = req.cookies.token;
    if (!token) {
      return next(createError.createError(401, "Please login first unAuth"));
    }
    const user: any = await getUserData(token);
    if (!user?._id) {
      return next(createError.createError(401, "Please login first"));
    }
    const { name, profilePic } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        name,
        profilePic,
      },
      { new: true }
    ).select("-password -__v -createdAt ");
    res.status(200).json({
      user: updatedUser,
    });
  }
);
export default updateUserDetails;
