import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    password: "",
    role: "", 
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.username ||
      !form.email ||
      !form.phone ||
      !form.age ||
      !form.gender ||
      !form.password ||
      !form.role
    ) {
      setError("Please fill all fields including role.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    
    if (users.some((u) => u.email === form.email)) {
      setError("Email already exists. Try logging in.");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    navigate("/login");
  }

  return (
    <div className="center-page">
      <div className="card">
        <h2 className="title">Create Account</h2>

        <form className="form" onSubmit={handleSubmit}>
          <input
            name="username"
            className="input"
            placeholder="Full Name"
            value={form.username}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            className="input"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            className="input"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            name="age"
            type="number"
            className="input"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
          />

          <select
            name="gender"
            className="input"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          
          <select
            name="role"
            className="input"
            value={form.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>

          <input
            name="password"
            type="password"
            className="input"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          {error && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "-10px" }}>
              {error}
            </div>
          )}

          <button className="btn-primary" type="submit">
            Register
          </button>
        </form>

        <p className="small-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
