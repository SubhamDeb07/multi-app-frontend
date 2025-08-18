import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../core/api.js";
import "../css/forms.css";
import "../css/auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await API.post("/users/reset-password", { email, newPassword });
      alert("Password updated successfully. Please login.");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="container">
      <div className="auth-card">
        <h2>Reset Password</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-wrapper">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Reset Password</button>
        </form>

        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          <span
            className="auth-link"
            onClick={() => navigate("/")}
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
