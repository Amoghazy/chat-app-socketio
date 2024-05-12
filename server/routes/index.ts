import express from "express";
import registerNewUser from "../controller/userController/register";
import checkEmail from "../controller/userController/checkEmail";
import checkPassword from "../controller/userController/checkPassword";
import userDetails from "../controller/userController/userDetails";
import logout from "../controller/userController/logOut";
import updateUserDetails from "../controller/userController/updateUserDetails";
import upload from "../middleware/uploadFile";
import uploadToCloudinary from "../config/cloudinaryConfig";
import searchUser from "../controller/userController/searchUser";

const router = express.Router();

router.post(
  "/register",
  upload.single("profilePic"),
  uploadToCloudinary,
  registerNewUser
);
router.post("/checkemail", checkEmail);
router.post("/checkpassword", checkPassword);
router.get("/user-details", userDetails);
router.get("/logout", logout);
router.get("/search", searchUser);
router.patch(
  "/update-user-details",
  upload.single("profilePic"),
  uploadToCloudinary,
  updateUserDetails
);

export default router;
