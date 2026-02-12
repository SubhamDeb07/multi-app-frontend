import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/AppsHome.css";
import "../css/auth.css";

export default function AppsHome() {
  const navigate = useNavigate();

  const apps = [
    { name: "Expense Tracker", path: "/expense-tracker/dashboard" },
    { name: "Ask My Resume", path: "/note-summarizer/dashboard" },
    { name: "Generate Image", path: "/generate-image/dashboard" },
    { name: "Work Tracker (Appraisal AI)", path: "/work-tracker/dashboard" },

    // Add more apps here later
  ];

  const handleLogout = () => {
    // Clear token / session
    localStorage.removeItem("token"); // or sessionStorage
    // Redirect to login
    navigate("/");
  };

  return (
    <div className="apps-container">
      <div className="apps-header">
        <h1>My Apps</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
  
      <div className="apps-grid">
        {apps.map((app) => (
          <div className="app-card" key={app.path}>
            <Link to={app.path}>{app.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
  
}
