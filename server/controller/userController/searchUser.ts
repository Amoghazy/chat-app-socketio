import { Request, Response } from "express";
import handelError from "../../utils/wrapError";
import getUserData from "../../utils/getUserData";
import createError from "../../utils/createError";
import User from "../../models/userModel";

const searchUser = handelError(
  async (req: Request, res: Response, next: any) => {
    const search: string = req.query.user as string;
    if (search == "" && search.length < 2) {
      return res.status(200).json({
        error: "Search term must be at least 3 characters long",
        data: [],
      });
    } else {
      const user = await User.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      });

      res.status(200).json({ success: true, data: user });
    }
  }
);
export default searchUser;
