const cloudinary = require("../config/cloudinary");
const Image = require("../models/Image");

exports.uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const newImage = await Image.create({
      url: result.secure_url,
      publicId: result.public_id,
    });
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ error: "Image upload failed", details: err });
  }
};
