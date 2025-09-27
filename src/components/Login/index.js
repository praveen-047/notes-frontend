import { useState } from "react";
import { login } from "../../api";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); // start loader
  try {
    const data = await login(email, password);
    if (data.token && data.user) {
      onLogin(data);
      navigate("/"); // redirect to dashboard
    } else {
      alert(data.error || "Invalid credentials");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false); // stop loader
  }
};


  return (
    <div className="login-main-container">
      <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className="login-btn" disabled={loading}>
  {loading ? "Logging in..." : "Login"}
</button>
      </form>
    </div>
    </div>
  );
}
