import React, { useState } from "react";
import API from "../../../core/api"; 

export default function FileUpload({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      await API.post("/summarizer/file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (onUploaded) onUploaded(); // refresh summaries
    } catch (error) {
      console.error(error);
      alert("Error summarizing file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload">
      {/* Hidden input */}
      <input
        id="fileInput"
        type="file"
        onChange={handleFileChange}
        className="file-input"
      />

      {/* Custom styled label */}
      <label htmlFor="fileInput" className="file-label">
        {file ? file.name : "Choose File"}
      </label>

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload & Process"}
      </button>
    </div>
  );
}
