const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// storing images in cloudinary 
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

const uploadImage = upload.single("thumbnail");
module.exports = uploadImage;
