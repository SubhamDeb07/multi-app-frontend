import React from "react";

export default function AddTodoDrawer({
  title,
  type,
  project,
  contextText,
  contextBullets,
  loading,
  onTitleChange,
  onTypeChange,
  onProjectChange,
  onContextChange,
  onAddContextBullet,
  onRemoveContextBullet,
  onSave,
  onClose,
}) {
  return (
    <>
      {/* Overlay */}
      <div className="drawer-overlay" onClick={onClose} />

      {/* Drawer */}
      <div className="drawer">
        <div className="drawer-header">
          <h3>Add Task</h3>
          <button className="drawer-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />

        <select value={type} onChange={(e) => onTypeChange(e.target.value)}>
          <option value="">Select type (optional)</option>
          <option value="feature">Feature</option>
          <option value="bug">Bug</option>
          <option value="refactor">Refactor</option>
          <option value="learning">Learning</option>
          <option value="ops">Ops</option>
        </select>

        <select
          value={project}
          onChange={(e) => onProjectChange(e.target.value)}
        >
          <option value="SPINE">SPINE</option>
        </select>

        <div className="bullets-section">
          <label>Task Context (optional)</label>
          <div className="bullets-list">
            {contextBullets.map((bullet, index) => (
              <div key={index} className="bullet-item">
                <input
                  type="text"
                  placeholder={`Context point ${index + 1}`}
                  value={bullet}
                  onChange={(e) => onContextChange(index, e.target.value)}
                />
                <button
                  type="button"
                  className="remove-bullet-btn"
                  onClick={() => onRemoveContextBullet(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="add-bullet-btn"
            onClick={onAddContextBullet}
          >
            + Add Context Point
          </button>
        </div>

        <div className="drawer-buttons">
          <button className="add-task-btn" onClick={onSave} disabled={loading}>
            {loading ? "Saving..." : "Save Task"}
          </button>

          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
