import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Find matching user
    const user = users.find(
      (u) => u.email === email && u.password === pass
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    // Store logged in user
    localStorage.setItem("loggedUser", JSON.stringify(user));

    // Redirect based on role
    if (user.role === "Admin") {
      navigate("/adminhome");
    } else {
      navigate("/home");
    }
  }

  return (
    <div className="center-page">
      <div className="card">
        <h2 className="title">Login</h2>

        <form onSubmit={handleLogin} className="form">
          <input
            type="email"
            className="input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="input"
            placeholder="Enter password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />

          {error && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "-10px" }}>
              {error}
            </div>
          )}

          <button className="btn-primary" type="submit">
            Login
          </button>
        </form>

        <p className="small-text">
          Don’t have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
