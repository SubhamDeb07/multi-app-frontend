// components/QAOutput.js
import React, { useState, useEffect } from "react";
import API from "../../../core/api.js";

export default function QAOutput() {
  const [qa, setQA] = useState({});
  const [skills, setSkills] = useState([]); // ✅ all skills for this user
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(5);
  const [selectedTechs, setSelectedTechs] = useState([]);

  // 🔹 Fetch existing QAs + skills when component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [qaRes, skillsRes] = await Promise.all([
          API.get("/summarizer/qa/my"),
          API.get("/summarizer/skills/my"),
        ]);

        // ensure we always get array of items
        const qaItems = Array.isArray(qaRes.data?.qa)
          ? qaRes.data.qa.flatMap((group) => group.qa) // flatten inner qa arrays
          : [];


        // group by topics
        const grouped = {};
        qaItems.forEach((item) => {
          const tech = item.topics?.[0] || "general";
          if (!grouped[tech]) grouped[tech] = [];
          grouped[tech].push(item);
        });
        setQA(grouped);

        setSkills(skillsRes.data || []);
      } catch (err) {
        console.error("Failed to fetch Q&A or skills", err);
      }
    };

    fetchData();
  }, []);

  const toggleTech = (tech) => {
    setSelectedTechs((prev) => {
      if (prev.includes(tech)) {
        return prev.filter((t) => t !== tech); // unselect
      } else {
        if (prev.length < 5) {
          return [...prev, tech]; // select
        } else {
          alert("You can select up to 5 techs only");
          return prev;
        }
      }
    });
  };

  const generateQA = async () => {
    if (selectedTechs.length === 0) {
      return alert("Please select at least one tech");
    }

    const counts = {};
    selectedTechs.forEach((tech) => {
      counts[tech] = count;
    });

    setLoading(true);
    try {
      // ✅ call user-centric endpoint (no resumeId)
      const res = await API.post("/summarizer/qa/generate", { counts });

      // Merge new QAs into existing state
      const newByTech = res.data.byTech || {};
      setQA((prev) => {
        const merged = { ...prev };
        Object.entries(newByTech).forEach(([tech, items]) => {
          if (!merged[tech]) merged[tech] = [];
          merged[tech] = [...merged[tech], ...items];
        });
        return merged;
      });
    } catch (err) {
      console.error(err);
      alert("Failed to generate Q&A");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="qa-container">
      {/* Title */}
      <p>
        <strong>Select up to 5 techs:</strong>
      </p>

      {/* Tech cards */}
      <div className="qa-tech-grid">
        {skills.map((tech, idx) => (
          <div
            key={idx}
            className={`qa-tech-card ${
              selectedTechs.includes(tech) ? "selected" : ""
            }`}
            onClick={() => toggleTech(tech)}
          >
            {tech}
          </div>
        ))}
      </div>

      {/* Count + Generate button */}
      <div className="qa-action-row">
        <label>
          Questions per tech:{" "}
          <input
            type="number"
            value={count}
            min="1"
            onChange={(e) => setCount(parseInt(e.target.value, 10))}
          />
        </label>

        <button onClick={generateQA} disabled={loading}>
          {loading ? (
            <>
              <span className="button-spinner"></span> Generating...
            </>
          ) : (
            "Generate Questions"
          )}
        </button>
      </div>

      {/* Results */}
      {qa && Object.keys(qa).length > 0 ? (
        <div className="qa-results">
          {Object.entries(qa).map(([tech, items]) => (
            <div key={tech}>
              <h4>{tech}</h4>
              <div className="qa-list">
                {items.map((item) => (
                  <div key={item._id} className="qa-card">
                    <div className="question">Q: {item.question}</div>
                    <div className="answer">A: {item.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No questions yet. Select techs and generate.</p>
      )}
    </div>
  );
}
