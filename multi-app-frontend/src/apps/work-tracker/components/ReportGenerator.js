import React, { useState } from "react";
import API from "../../../core/api.js";

export default function ReportGenerator({ onClose }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!from || !to) return alert("Please select both dates");

    setLoading(true);
    try {
      const res = await API.get("/report/generate", {
        params: {
          from,
          to,
          label: `${from} → ${to}`,
        },
      });

      setReport(res.data?.report || "No report generated");
    } catch (err) {
      console.error(err);
      alert("Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(report);
    alert("Report copied to clipboard!");
  };

  return (
    <>
      {/* Overlay */}
      <div className="drawer-overlay" onClick={onClose} />

      {/* Drawer */}
      <div className="drawer report-drawer">
        <div className="drawer-header">
          <h3>📊 Generate Report</h3>
          <button className="drawer-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="date-selection">
          <div className="date-field">
            <label>From Date</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <div className="date-field">
            <label>To Date</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>

        <button
          className="generate-btn"
          onClick={generate}
          disabled={loading || !from || !to}
        >
          {loading ? "Generating..." : "Generate Report"}
        </button>

        {report && (
          <div className="report-output">
            <div className="report-header">
              <h4>Report Output</h4>
              <button className="copy-btn" onClick={copyToClipboard}>
                📋 Copy
              </button>
            </div>
            <pre>{report}</pre>
          </div>
        )}

        <div className="drawer-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
