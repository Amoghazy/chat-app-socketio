import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";
import { Request, Response } from "express";
import { Readable } from "stream";

interface CustomFile extends Express.Multer.File {
  cloudinaryUrl?: string;
}

async function uploadToCloudinary(
  req: Request,
  res: Response,
  next: any
): Promise<void> {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const file = req.file as CustomFile;

    if (!file) {
      console.log("No file uploaded");
      return next();
    }

    const streamUpload = (): Promise<UploadApiResponse> => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          (error: any, result: UploadApiResponse) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        const fileStream = new Readable();
        fileStream.push(file.buffer);
        fileStream.push(null);

        fileStream.pipe(stream);
      });
    };

    const result: UploadApiResponse | UploadApiErrorResponse =
      await streamUpload();

    if (result.secure_url) {
      req.body.profilePic = result.secure_url;

      next();
    } else {
      console.error("Upload failed:", result);
      throw new Error("Upload to Cloudinary failed");
    }
  } catch (error) {
    console.error("Error during upload:", error);
    next(error);
  }
}

export default uploadToCloudinary;
