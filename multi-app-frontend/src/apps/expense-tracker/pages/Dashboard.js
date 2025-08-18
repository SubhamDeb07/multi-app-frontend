import { useEffect, useState } from "react";
import API from "../../../core/api";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    amount: "",
    note: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categories = ["Food", "Travel", "Shopping", "Bills", "Health", "Other"];

  // ✅ Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expense/getAll");
      setExpenses(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load expenses. Please login again.");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await API.post("/expense/add", form);
      setSuccess("Expense added successfully!");
      setForm({ title: "", category: "", amount: "", note: "", date: "" });
      fetchExpenses(); // 🔁 refresh list
    } catch (err) {
      console.error(err);
      setError("Failed to add expense");
    }
  };
const total = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

  return (
    <div className="container">
      <h2>Dashboard</h2>

      {/* ✅ Add Expense Form */}
      <h3>Add Expense</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <br />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <br />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <br />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <br />

        <textarea
          name="note"
          placeholder="Note (optional)"
          value={form.note}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Add Expense</button>
      </form>

      {/* ✅ Show List */}
      <h3 style={{ marginTop: "2rem" }}>All Expenses</h3>
      <h4>Total: ₹{total}</h4>

      <table border="1" cellPadding="8" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td>{e.date}</td>
              <td>{e.title}</td>
              <td>{e.category}</td>
              <td>₹{e.amount}</td>
              <td>{e.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
