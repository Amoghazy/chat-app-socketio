import handelError from "../../utils/wrapError";
import { Request, Response } from "express";
import createError from "../../utils/createError";
import getUserData from "../../utils/getUserData";

const userDetails = handelError(
  async (req: Request, res: Response, next: any) => {
    const token = req.cookies.token;
    if (!token) {
      return next(createError.createError(401, "Please login first!"));
    }
    const user = await getUserData(token);
    res.status(200).json({ user });
  }
);
export default userDetails;
