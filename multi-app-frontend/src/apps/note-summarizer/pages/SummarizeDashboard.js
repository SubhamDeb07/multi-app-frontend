import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import TextInput from "../components/TextInput";
import SummaryOutput from "../components/SummaryOutput";
import "../css/NoteSummarizer.css";

export default function SummarizerDashboard() {
  const [summary, setSummary] = useState("");

  return (
    <div className="dashboard-container">
      <h1>Note Summarizer</h1>

      {/* Text input method */}
      <div className="summarizer-section">
        <TextInput onSummary={setSummary} />
      </div>

      {/* File upload method */}
      <div className="summarizer-section">
        <FileUpload onSummary={setSummary} />
      </div>

      {/* Summary output */}
      {summary && (
        <div className="summary-output">
          <SummaryOutput text={summary} />
        </div>
      )}
    </div>
  );
}
