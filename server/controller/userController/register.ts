import { Request, Response } from "express";
import handelError from "../../utils/wrapError";
import User from "../../models/userModel";
import createError from "../../utils/createError";
import bcrypt from "bcryptjs";
const registerNewUser = handelError(
  async (req: Request, res: Response, next: any) => {
    let { email, name, password, profilePic } = req.body;
    let foundedUser = await User.findOne({ email });
    if (foundedUser) {
      return next(createError.createError(400, "User already exists"));
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      name,
      password: hashPassword,
      profilePic,
    });
    await newUser.save();
    console.log(newUser);

    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  }
);
export default registerNewUser;
