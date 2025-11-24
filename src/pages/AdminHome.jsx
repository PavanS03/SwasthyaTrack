import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminHome.css";
import logo from "../assets/home-logo.png";

export default function AdminHome() {
  return (
    <div className="admin-home page-card">

      {/* Header */}
      <div className="admin-header">
        <div className="admin-title">
          <h1>Swasthya Tracker — Admin Panel</h1>
          <p>Manage courses • View users • Track activity</p>
        </div>

        <div className="admin-header-logo">
          <img src="/assets/home-logo.png" alt="App Logo" />
        </div>
      </div>

      {/* Greeting */}
      <div className="admin-welcome">
        <span>Welcome, Admin 👋</span>
      </div>

      {/* Navigation Grid */}
      <div className="admin-grid">
        <Link to="/adminaddcourse" className="admin-card">
          <h2>📘 Courses</h2>
          <p>Add & edit available fitness courses.</p>
        </Link>

        <Link to="/adminuser" className="admin-card">
          <h2>👤 Users</h2>
          <p>View all registered users.</p>
        </Link>

        <Link to="/admindashboard" className="admin-card">
          <h2>📊 User Course Data</h2>
          <p>Check which users joined which courses.</p>
        </Link>

        <Link to="/login" className="admin-card danger">
          <h2>🚪 Logout</h2>
          <p>Exit admin panel & go to user home.</p>
        </Link>
      </div>
    </div>
  );
}
