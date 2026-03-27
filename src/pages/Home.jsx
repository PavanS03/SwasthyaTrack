import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";
import logo from "../assets/home-logo.png"; 

export default function Home() {
  const navigate = useNavigate();

  function handleLogout() {
    
    localStorage.removeItem("loggedUser");

    
    navigate("/feedback");
  }

  return (
    <div className="home-page">

     
      <header className="home-header">

        <div className="header-left">
          <img src={logo} alt="logo" className="home-logo" />
          <h1 className="brand-title">SwasthyTracker</h1>
        </div>

        <p className="brand-subtitle">
          Your personal fitness & wellness companion
        </p>
      </header>

      
      <div className="dashboard-grid">
        <Link to="/course" className="dash-card">
          <h2>🏋 Courses</h2>
          <p>Explore available fitness & wellness programs.</p>
        </Link>

        <Link to="/chartdisplay" className="dash-card">
          <h2>📅 Weekly Workout</h2>
          <p>Select & submit your weekly workout plan.</p>
        </Link>

        <Link to="/monthlyreport" className="dash-card">
          <h2>📊 Monthly Report</h2>
          <p>View your overall monthly progress.</p>
        </Link>

        <Link to="/registrationmf" className="dash-card">
          <h2>⚖ BMI / Health</h2>
          <p>Calculate BMI and track body stats.</p>
        </Link>

        <Link to="/about" className="dash-card">
          <h2>ℹ About Us</h2>
          <p>Know more about SwasthyTracker.</p>
        </Link>

        <Link to="/contact" className="dash-card">
          <h2>📍 Contact</h2>
          <p>Reach out or visit our branches.</p>
        </Link>
      </div>

    
      <div className="logout-container">
        <button className="btn ghost logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  );
}