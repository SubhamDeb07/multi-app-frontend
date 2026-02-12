import React, { useState, useEffect } from "react";
import API from "../../../core/api.js";

export default function ReportsList({ onClose, onViewReport }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await API.get("/report/all");
      setReports(res.data?.reports || []);
    } catch (err) {
      console.error("Failed to fetch reports", err);
      alert("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  const viewReport = async (reportId) => {
    try {
      const res = await API.get(`/report/${reportId}`);
      setSelectedReport(res.data?.report);
    } catch (err) {
      console.error("Failed to fetch report details", err);
      alert("Failed to fetch report details");
    }
  };

  const deleteReport = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      await API.delete(`/report/${reportId}`);
      fetchReports();
      if (selectedReport?.id === reportId) {
        setSelectedReport(null);
      }
    } catch (err) {
      console.error("Failed to delete report", err);
      alert("Failed to delete report");
    }
  };

  const copyToClipboard = () => {
    if (selectedReport) {
      navigator.clipboard.writeText(selectedReport.reportContent);
      alert("Report copied to clipboard!");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Overlay */}
      <div className="drawer-overlay" onClick={onClose} />

      {/* Drawer */}
      <div className="drawer report-drawer reports-list-drawer">
        <div className="drawer-header">
          <h3>📊 Saved Reports</h3>
          <button className="drawer-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {loading ? (
          <div className="loading-state">Loading reports...</div>
        ) : reports.length === 0 ? (
          <div className="empty-state-drawer">
            No reports generated yet. Create your first report!
          </div>
        ) : (
          <div className="reports-content">
            {!selectedReport ? (
              <div className="reports-list">
                {reports.map((report) => (
                  <div key={report.id} className="report-item">
                    <div className="report-item-header">
                      <strong>{report.periodLabel}</strong>
                      <span className="report-task-count">
                        {report.taskCount} tasks
                      </span>
                    </div>
                    <div className="report-item-dates">
                      {formatDate(report.periodFrom)} -{" "}
                      {formatDate(report.periodTo)}
                    </div>
                    <div className="report-item-meta">
                      Generated on {formatDate(report.createdAt)}
                    </div>
                    <div className="report-item-actions">
                      <button
                        className="view-btn"
                        onClick={() => viewReport(report.id)}
                      >
                        👁 View
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteReport(report.id)}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="report-detail">
                <button
                  className="back-btn"
                  onClick={() => setSelectedReport(null)}
                >
                  ← Back to List
                </button>
                <div className="report-detail-header">
                  <h4>{selectedReport.periodLabel}</h4>
                  <button className="copy-btn" onClick={copyToClipboard}>
                    📋 Copy
                  </button>
                </div>
                <div className="report-detail-meta">
                  <span>
                    {formatDate(selectedReport.periodFrom)} -{" "}
                    {formatDate(selectedReport.periodTo)}
                  </span>
                  <span>{selectedReport.taskCount} tasks</span>
                </div>
                <div className="report-output">
                  <pre>{selectedReport.reportContent}</pre>
                </div>
              </div>
            )}
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
