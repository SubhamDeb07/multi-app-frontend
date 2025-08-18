// src/apps/note-summarizer/components/FileUpload.js
import React, { useState } from "react";
import API from "../../../core/api"; // ✅ same as in expense tracker

export default function FileUpload({ onSummary }) {
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
      const res = await API.post("/summarizer/file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSummary(res.data.summary);
    } catch (error) {
      console.error(error);
      alert("Error summarizing file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Summarizing..." : "Upload & Summarize"}
      </button>
    </div>
  );
}
