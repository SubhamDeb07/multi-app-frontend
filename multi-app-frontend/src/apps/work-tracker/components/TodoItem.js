import React, { useState } from "react";
import API from "../../../core/api.js";

export default function TodoItem({ todo, onDone }) {
  const [notesBullets, setNotesBullets] = useState([""]);
  const [loading, setLoading] = useState(false);

  const markCompleted = async () => {
    setLoading(true);
    try {
      await API.patch(`/todo/complete/${todo.id}`, {
        workNotesBullets: notesBullets.filter((n) => n.trim()),
      });
      onDone();
    } catch (err) {
      console.error(err);
      alert("Failed to complete task");
    } finally {
      setLoading(false);
    }
  };

  const handleNoteChange = (index, value) => {
    const newNotes = [...notesBullets];
    newNotes[index] = value;
    setNotesBullets(newNotes);
  };

  const addNoteBullet = () => {
    setNotesBullets([...notesBullets, ""]);
  };

  const removeNoteBullet = (index) => {
    if (notesBullets.length === 1) return;
    const newNotes = notesBullets.filter((_, i) => i !== index);
    setNotesBullets(newNotes);
  };

  return (
    <div className={`todo-card ${todo.status}`}>
      <div className="todo-header">
        <strong>{todo.title}</strong>
        <div className="todo-badges">
          {todo.type && (
            <span className={`badge badge-${todo.type}`}>{todo.type}</span>
          )}
          {todo.project && (
            <span className="badge badge-project">{todo.project}</span>
          )}
        </div>
      </div>

      {todo.taskContextBullets?.length > 0 && (
        <ul>
          {todo.taskContextBullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}

      {todo.status === "pending" && (
        <div className="work-notes-section">
          <div className="bullets-list">
            {notesBullets.map((note, index) => (
              <div key={index} className="bullet-item">
                <input
                  type="text"
                  placeholder={`Work note ${index + 1}`}
                  value={note}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                />
                <button
                  type="button"
                  className="remove-bullet-btn"
                  onClick={() => removeNoteBullet(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="add-bullet-btn"
            onClick={addNoteBullet}
          >
            + Add Work Note
          </button>
          <button onClick={markCompleted} disabled={loading}>
            {loading ? "Saving..." : "Mark Completed"}
          </button>
        </div>
      )}
    </div>
  );
}
