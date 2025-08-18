import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../core/api.js";
import "../css/forms.css";
import "../css/auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      const res = await API.post("/users/register", form);
      alert("Signup completed. Please login to continue");
      navigate("/");
    } catch (e) {
      console.log("Error while signing", e);
      setError(e?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container">
      <div className="auth-card">
        <h2>Signup</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Password field with eye icon */}
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

          <button type="submit">Register</button>
        </form>
         {/* Navigation link for existing users */}
         <p className="auth-navigation">
          Already have an account?{" "}
          <span
            className="auth-link"
            onClick={() => navigate("/")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
