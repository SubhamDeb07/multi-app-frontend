import React from "react";
import { Link } from "react-router-dom";
import "../css/AppsHome.css";
import "../css/auth.css"

export default function AppsHome() {
  const apps = [
    { name: "Expense Tracker", path: "/expense-tracker/dashboard" },
    { name: "Note Summarizer", path: "/note-summarizer/dashboard" },
    // Add more apps here later
  ];

  return (
    <div className="apps-container">
      <h1>My Apps</h1>
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
