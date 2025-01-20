// backend/routes/uploadRoutes.js
const express = require("express");
const router = express.Router();
const  uploadImage  = require("../middlewares/fileUpload");

// POST route to upload an image
router.post("/upload", uploadImage, (req, res) => {
console.log("req?.image__________", req?.image);
console.log("req?.body__________", req?.body);
console.log("req?.file__________", req?.file);
  
  if (!req) {
    return res.status(400).json({ error: "Image upload failed" });
  }

  // Return the image URL from Cloudinary to the client
  res.json({
    message: "Image uploaded successfully!",
    imageUrl: req.file.path, // URL of the uploaded image
    publicId: req.file.filename, // Public ID of the image (for future deletions)
  });
});

module.exports = router;
