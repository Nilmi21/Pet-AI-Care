import React, { useState } from "react";
import "../custom-css/custom-file-upload.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Swal from "sweetalert2";

function Uploader({ lablename, handleFileUpload, erroOut, isImage }) {
  const [image, setImage] = useState(false);
  const [fileName, setFileName] = useState("No selected file");
  const [event, setevent] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const files = e.target.files;
    setevent(e);
    if (files.length > 0) {
      const file = files[0];
      if (isImage) {
        if (
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/jpg"
        ) {
          if (file.size <= 10 * 1024 * 1024) {
            setFileName(file.name);
            setImage(true);
            const reader = new FileReader();
            reader.onloadend = () => {
              setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            handleFileUpload(file);
          } else {
            Swal.fire({
              title: "File Too Large",
              text: "File size exceeds 10MB limit.",
              icon: "error",
              dangerMode: true,
            });
            e.target.value = null;
          }
        } else {
          Swal.fire({
            title: "File Format Error",
            text: "Only JPG/JPEG/PNG files are allowed.",
            icon: "error",
            dangerMode: true,
          });
          e.target.value = null;
        }
      }
    }
  };

  return (
    <main>
      <div
        className="uploadform col-md-6"
        onClick={() => document.querySelector(".input-img-field").click()}
      >
        <input
          type="file"
          accept="image/jpeg"
          className="input-img-field"
          hidden
          onChange={handleInputChange}
        />
        {image ? (
          <>
            <img
              src={imagePreviewUrl}
              alt="Uploaded"
              style={{ width: "190px", height: "190px" }}
            />
          </>
        ) : (
          <>
            <CloudUploadIcon color="info" size={60} />
            <p>{lablename}</p>
          </>
        )}
      </div>
      <section
        className="uploaded-row col-md-6"
        style={{ backgroundColor: "white" }}
      >
        <AddPhotoAlternateIcon
          onClick={() => document.querySelector(".input-img-field").click()}
          color="info"
          style={{ cursor: "pointer" }}
        />
        <span className="upload-content">
          {fileName} -
          <DeleteSweepIcon
            onClick={() => {
              setFileName("No selected File");
              setImage(false);
            }}
            style={{ cursor: "pointer" }}
          />
        </span>
      </section>
    </main>
  );
}

export default Uploader;