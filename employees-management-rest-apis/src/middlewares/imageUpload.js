const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImage = (req, res, next) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    if (!req.file) {
      console.log("No file uploaded");
      return next(); 
    }

    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Product-IMG",
      });
      req.body.image = result.secure_url;
      fs.unlink(req.file.path, (unlink) => {
        if (unlink) {
          console.log("Error deleting local file", unlink);
        }
      });
      next();
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: "Error uploading file to Cloudinary",
      });
    }
  });
};

module.exports = uploadImage; 
 