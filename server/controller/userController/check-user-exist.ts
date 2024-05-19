import { isValidObjectId } from "mongoose";
import User from "../../models/userModel";
import createError from "../../utils/createError";
import handelError from "../../utils/wrapError";
import { Request, Response } from "express";

const checkUserExist = handelError(
  async (req: Request, res: Response, next: any) => {
    const { id }: { id: string } = req.body;
    console.log(isValidObjectId(id));
    if (!isValidObjectId(id)) {
      return next(createError.createError(404, "Not Valid ID"));
    }
    const userExists = await User.findById(id);
    if (!userExists) {
      return next(createError.createError(404, "User not found"));
    }
    return res.status(200).json({ message: "Welcome back", found: true });
  }
);
export default checkUserExist;
