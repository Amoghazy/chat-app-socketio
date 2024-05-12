import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
async function uploadMediaMessageToCloudinary(
  fileBuffer: Buffer,

) {
  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "auto", folder: "messages" },
          (error: any, result: UploadApiResponse | undefined) => {
            if (error) {
              console.error("Error uploading file to Cloudinary:", error);
              reject(new Error("Error uploading file to Cloudinary"));
            } else if (!result) {
              console.error("No result received from Cloudinary");
              reject(new Error("No result received from Cloudinary"));
            } else {
              resolve(result);
            }
          }
        )
        .end(fileBuffer);
    });
    return result?.secure_url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw new Error("Error uploading file to Cloudinary");
  }
}
export default uploadMediaMessageToCloudinary;
