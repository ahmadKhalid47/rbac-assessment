// frontend/src/components/ImageUploader.js
import React, { useState } from "react";
import axios from "axios";

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      return alert("Please select an image to upload");
    }

    const formData = new FormData();
    formData.append("image", image);

    setUploading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/images/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setUploading(false);
      setImageUrl(response.data.imageUrl); // Display the image URL after successful upload
    } catch (error) {
      setUploading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          style={{ width: "200px", marginTop: "20px" }}
        />
      )}
    </div>
  );
}

export default ImageUploader;
