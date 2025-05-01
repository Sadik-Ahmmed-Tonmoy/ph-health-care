import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import sharp from "sharp";  // <--- ADD THIS

cloudinary.config({
  cloud_name: "dbpn5f2mb",
  api_key: "722788225112618",
  api_secret: "EBn1JHWZkj4-bXvFPEXbCYDv41M",
});

const uploadToCloudinary = async (file: any) => {
  const avifFilePath = `${file.path}.webp`;
  // Inside uploadToCloudinary
const { name } = path.parse(file.originalname);
  try {
    // Convert to AVIF using sharp
    await sharp(file.path)
      .toFormat("webp", { quality: 100 })
      .toFile(avifFilePath);
    // Upload AVIF file to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        avifFilePath,
        {
          public_id: name,
          overwrite: true,
          resource_type: "image",
        },
        (error: any, result: any) => {
          fs.unlinkSync(file.path); // delete original file
          fs.unlinkSync(avifFilePath); // delete avif file

          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });

    return result;
  } catch (error) {
    // Clean up files in case of failure
    if (fs.existsSync(avifFilePath)) fs.unlinkSync(avifFilePath);
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    throw error;
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export const fileUploader = {
  upload: upload.single("file"),
  uploadToCloudinary,
};
