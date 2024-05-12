import { Response } from "express";
import handelError from "../../utils/wrapError";

const logout = handelError(async (req: any, res: Response, next: any) => {
  return res.status(200).clearCookie("token").json({
    logut: true,
    message: "Logged out successfully",
  });
});
export default logout;
