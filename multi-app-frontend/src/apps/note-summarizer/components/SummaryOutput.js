import React from "react";
import ReactMarkdown from "react-markdown";

export default function SummaryOutput({ text }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Summary:</h3>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}
