import { useState } from "react";

export default function ImageUpload({ label, getImage, defaultImage }) {
  const [imageContent, setImageContent] = useState(null);

  return (
    <div className="mb-3">
      <label className="form-label text-black-50">{label}</label>
      <br />
      <label htmlFor="postImage" className="form-label text-black-50">
        <img
          src={imageContent ? imageContent : defaultImage}
          className="img-fluid w-50"
          htmlFor="postImage"
        />
      </label>
      <input
        // {imageContent ? : }
        className="form-control d-none"
        type="file"
        accept="image/*"
        id="postImage"
        name="postImage"
        onChange={(e) => {
          setImageContent(URL.createObjectURL(e.target.files[0]));
          getImage(e);
        }}
      />
    </div>
  );
}
