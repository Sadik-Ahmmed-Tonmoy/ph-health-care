import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: "dbpn5f2mb",
  api_key: "722788225112618",
  api_secret: "EBn1JHWZkj4-bXvFPEXbCYDv41M", // Click 'View API Keys' above to copy your API secret
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file: any) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path,
      {
        public_id: file.originalname,
        overwrite: true,
        resource_type: "auto",
      },
      (error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

// (async function() {

//     // Upload an image
//      const uploadResult = await

//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });

//     console.log(optimizeUrl);

//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });

//     console.log(autoCropUrl);
// })();
export const fileUploader = {
  upload: upload.single("file"),
  uploadToCloudinary,
};
