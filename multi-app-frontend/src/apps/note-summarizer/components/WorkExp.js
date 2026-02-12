// components/WorkExperienceQA.js
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";  // ✅ Add this
import API from "../../../core/api";
import "../css/NoteSummarizer.css";

export default function WorkExperienceQA() {
  const [workExps, setWorkExps] = useState([]);
  const [selectedExp, setSelectedExp] = useState(null);
  const [qaList, setQaList] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWorkExps = async () => {
      try {
        const res = await API.get("/summarizer/work-experiences/my");
        setWorkExps(res.data || []);
      } catch (err) {
        console.error("Failed to fetch work experiences", err);
      }
    };
    fetchWorkExps();
  }, []);

  const fetchQA = async (workExpId) => {
    try {
      const res = await API.get(`/summarizer/work-experience/${workExpId}/qa`);
      setQaList(Array.isArray(res.data) ? res.data : res.data.qa || []);
    } catch (err) {
      console.error("Failed to fetch Q&A", err);
    }
  };

  const handleSelect = (exp) => {
    setSelectedExp(exp);
    fetchQA(exp._id);
  };

  const askQuestion = async () => {
    if (!question.trim()) return alert("Please enter a question");
    if (!selectedExp) return alert("Select a work experience first");
  
    setLoading(true);
    try {
      const res = await API.post(
        `/summarizer/work-experience/${selectedExp._id}/ask`,
        { question }
      );
  
      // Ensure we extract the actual object correctly
      const newQA = res.data.qa || res.data;
  
      if (newQA && newQA._id) {
        setQaList((prev) => [newQA, ...prev]); // ✅ prepend cleanly
      }
  
      setQuestion("");
    } catch (err) {
      console.error("Failed to ask question", err);
      alert("Failed to ask question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="workexp-qa-container">
      <h3 className="section-title">Work Experience Q&A</h3>

      {/* Work Exp List */}
      <div className="workexp-list">
        {workExps.map((exp) => (
          <div
            key={exp._id}
            className={`workexp-card ${
              selectedExp?._id === exp._id ? "selected" : ""
            }`}
            onClick={() => handleSelect(exp)}
          >
            <strong>{exp.company || "Company"}</strong> –{" "}
            {exp.role || "Role"}{" "}
            {exp.duration ? <span>({exp.duration})</span> : ""}
          </div>
        ))}
      </div>

      {/* Question input */}
      {selectedExp && (
        <div className="qa-input">
          <textarea
            placeholder="Ask a question about this work experience..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={askQuestion} disabled={loading}>
            {loading ? "Asking..." : "Ask"}
          </button>
        </div>
      )}

      {/* Q&A List */}
      {qaList.length > 0 && (
        <div className="qa-results">
          <h4>
            Q&A for {selectedExp?.company}{" "}
            {selectedExp?.duration ? `(${selectedExp.duration})` : ""}
          </h4>
          {qaList.map((item) => (
            <div key={item._id} className="qa-card">
              <p className="question">❓ <strong>{item.question}</strong></p>
              <div className="answer">
                💡 <ReactMarkdown>{item.answer}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
