import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../core/api.js";
import "../css/forms.css";
import "../css/auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/users/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/apps");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="auth-card">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Password field with icon */}
          <div className="password-wrapper">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Log In</button>
        </form>
          {/* Additional navigation links */}
    <div className="auth-links">
      <p>
        <span
          className="auth-link"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </span>
      </p>
      <p>
        New user?{" "}
        <span
          className="auth-link"
          onClick={() => navigate("/signup")}
        >
          Signup here
        </span>
      </p>
    </div>
      </div>
    </div>
  );
};

export default Login;
