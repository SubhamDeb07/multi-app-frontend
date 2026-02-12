import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import API from "../../../core/api.js";

export default function SummaryOutput() {
  const [resumes, setResumes] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true);
      try {
        const res = await API.get("/summarizer/resumes/my");
        // backend usually returns { count, resumes }
        const list = Array.isArray(res.data?.resumes) ? res.data.resumes : (Array.isArray(res.data) ? res.data : []);
        setResumes(list);
      } catch (err) {
        console.error("Failed to fetch resumes", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  if (loading) return <p>Loading resumes...</p>;
  if (!resumes.length) return <p>No resumes uploaded yet.</p>;

  return (
    <div className="summary-container">
      <h3>Uploaded Resumes:</h3>
      <ul className="summary-list">
        {resumes.map((r) => {
          const id = r._id || r.resumeId; // ✅ stable id
          const isOpen = expandedId === id;
          return (
            <li key={id} className="summary-item">
              <div
                className="summary-header"
                onClick={() => setExpandedId((prev) => (prev === id ? null : id))}
              >
                <span className="summary-arrow">{isOpen ? "▼" : "▶"}</span>
                <span>
                  {r.fileName || `Resume ${id}`}{" "}
                  {r.createdAt ? `(${new Date(r.createdAt).toLocaleDateString()})` : ""}
                </span>
              </div>

              {isOpen && (
                <div className="summary-content">
                  <ReactMarkdown>{r.summary}</ReactMarkdown>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
