const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();
const router = express.Router();

// cloudinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("raw"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please provide File" });
    }

    // Function to handle the stream upload image to cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        // User streamifier to stream the file buffer
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };
    // call the streamUpload function with the fileBuffer
    const result = await streamUpload(req.file.buffer);
    // response with the uploaded image URL
    res.json({ success:true,url: result.secure_url });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
