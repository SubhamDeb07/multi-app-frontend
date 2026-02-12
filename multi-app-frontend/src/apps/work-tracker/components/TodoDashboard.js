import React, { useEffect, useState } from "react";
import API from "../../../core/api.js";
import TodoItem from "./TodoItem.js";
import ReportGenerator from "./ReportGenerator.js";
import AddTodoDrawer from "./AddTodoDrawer.js";
import ReportsList from "./ReportsList.js";

export default function TodoDashboard() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Drawer + form state
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showReportDrawer, setShowReportDrawer] = useState(false);
  const [showReportsList, setShowReportsList] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [project, setProject] = useState("SPINE");
  const [contextBullets, setContextBullets] = useState([""]);

  // Search / filter
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todo/getAll");
      setTodos(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch todos", err);
    }
  };

  const addTodo = async () => {
    if (!title.trim()) return alert("Title required");

    setLoading(true);
    try {
      await API.post("/todo/add", {
        title,
        type: type || null,
        project: project || null,
        taskContextBullets: contextBullets.filter((b) => b.trim()),
      });

      setTitle("");
      setType("");
      setProject("SPINE");
      setContextBullets([""]);
      setShowAddDrawer(false);
      fetchTodos();
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const handleContextChange = (index, value) => {
    const newBullets = [...contextBullets];
    newBullets[index] = value;
    setContextBullets(newBullets);
  };

  const addContextBullet = () => {
    setContextBullets([...contextBullets, ""]);
  };

  const removeContextBullet = (index) => {
    if (contextBullets.length === 1) return;
    const newBullets = contextBullets.filter((_, i) => i !== index);
    setContextBullets(newBullets);
  };

  const filteredTodos = todos
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => t.status === activeTab);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTodos = filteredTodos.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeTab]);

  return (
    <div className="work-page">
      {/* Header with buttons */}
      <div className="work-header">
        <h2>My Work Tracker</h2>
        <div className="header-buttons">
          <button
            className="add-task-btn"
            onClick={() => setShowAddDrawer(true)}
          >
            + Add Task
          </button>
          <button
            className="generate-report-btn"
            onClick={() => setShowReportDrawer(true)}
          >
            📊 Generate Report
          </button>
          <button
            className="view-reports-btn"
            onClick={() => setShowReportsList(true)}
          >
            📋 View Reports
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search by task title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab ${activeTab === "pending" ? "active" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>
        <button
          className={`tab ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>

      {/* Task list */}
      <div className="todo-list">
        {paginatedTodos.length > 0 ? (
          paginatedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDone={fetchTodos} />
          ))
        ) : (
          <div className="empty-state">No {activeTab} tasks found</div>
        )}
      </div>

      {/* Pagination */}
      {filteredTodos.length > 0 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredTodos.length)} of {filteredTodos.length}{" "}
            tasks
          </div>
          <div className="pagination-buttons">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Add Task Drawer */}
      {showAddDrawer && (
        <AddTodoDrawer
          title={title}
          type={type}
          project={project}
          contextBullets={contextBullets}
          loading={loading}
          onTitleChange={setTitle}
          onTypeChange={setType}
          onProjectChange={setProject}
          onContextChange={handleContextChange}
          onAddContextBullet={addContextBullet}
          onRemoveContextBullet={removeContextBullet}
          onSave={addTodo}
          onClose={() => setShowAddDrawer(false)}
        />
      )}

      {/* Report Generator Drawer */}
      {showReportDrawer && (
        <ReportGenerator onClose={() => setShowReportDrawer(false)} />
      )}

      {/* Reports List Drawer */}
      {showReportsList && (
        <ReportsList onClose={() => setShowReportsList(false)} />
      )}
    </div>
  );
}
