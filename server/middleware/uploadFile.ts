import multer from "multer";
import createError from "../utils/createError";

import { Request } from "express";

const storage = multer.memoryStorage();
function fileFilter(req: Request, file: any, cb: any) {
  console.log(file);
  let type = file.mimetype.split("/")[0];

  if (type == "image") {
    return cb(null, true);
  } else {
    return cb(createError.createError(400, "failed", "file not image"), false);
  }
}

const upload = multer({ storage, fileFilter });
export default upload;
