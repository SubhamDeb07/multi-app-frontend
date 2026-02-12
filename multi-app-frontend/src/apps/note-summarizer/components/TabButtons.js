// components/TabButtons.js
import React from "react";

export default function TabButtons({ activeTab, setActiveTab }) {
  return (
    <div className="tab-buttons">
      <button
        className={activeTab === "summary" ? "active" : ""}
        onClick={() => setActiveTab("summary")}
      >
        Summaries
      </button>

      <button
        className={activeTab === "qa" ? "active" : ""}
        onClick={() => setActiveTab("qa")}
      >
        Skills Q&A
      </button>

      <button
        className={activeTab === "workexp" ? "active" : ""}
        onClick={() => setActiveTab("workexp")}
      >
        Work Experience Q&A
      </button>
    </div>
  );
}
