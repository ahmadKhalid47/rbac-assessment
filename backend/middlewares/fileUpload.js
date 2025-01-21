const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");



cloudinary.config({
  cloud_name: "dcdynkm5d",
  api_key: "157745433978489",
  api_secret: "AqvKiU623z4vCZStGiBvBgk-2vQ",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    format: (req, res) => "png",
  },
});

const upload = multer({
  storage: storage,
});


// Middleware for uploading a single file
const uploadImage = upload.single("thumbnail"); // 'image' is the field name from FormData

module.exports = uploadImage;
