import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
// import TextInput from "../components/TextInput";
import SummaryOutput from "../components/SummaryOutput";
import QAOutput from "../components/QAcomp.js";
import WorkExperienceQA from "../components/WorkExp.js"; 
import TabButtons from "../components/TabButtons.js";
import { Link } from "react-router-dom";
import "../css/NoteSummarizer.css";

export default function SummarizerDashboard() {
  const [activeTab, setActiveTab] = useState("summary");
  const [refreshKey, setRefreshKey] = useState(0); 

  return (
    <div className="dashboard-container">
      <div className="back-button-container2">
        <Link to="/apps" className="back-button2">
          ⬅ Back to Home
        </Link>
      </div>

      <h1>Ask My Resume</h1>

      {/* File upload method */}
      <div className="summarizer-section">
        <FileUpload
          onUploaded={() => setRefreshKey((prev) => prev + 1)} // refresh summaries
        />
      </div>

      {/* Tabs */}
      <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="tab-content">
        {/* Summary Tab */}
        {activeTab === "summary" && (
          <SummaryOutput key={refreshKey} /> // ✅ always fetches from API
        )}

        {/* Skills/QA Tab */}
        {activeTab === "qa" && <QAOutput />}

        {/* Work Experience Q&A Tab */}
        {activeTab === "workexp" && <WorkExperienceQA />}
      </div>
    </div>
  );
}
