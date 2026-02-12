// // src/apps/note-summarizer/components/TextInput.js
// import React, { useState } from "react";
// import API from "../../../core/api"; // ✅ same API instance

// export default function TextInput({ onSummary }) {
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSummarize = async () => {
//     if (!text.trim()) return alert("Please enter some text");

//     setLoading(true);
//     try {
//       const res = await API.post("/summarizer/text", { text });
//       onSummary(res.data.summary);
//     } catch (error) {
//       console.error(error);
//       alert("Error summarizing text");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <textarea
//         rows="6"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Paste your notes here..."
//         style={{ width: "100%" }}
//       />
//       <button onClick={handleSummarize} disabled={loading}>
//         {loading ? "Summarizing..." : "Summarize Text"}
//       </button>
//     </div>
//   );
// }
