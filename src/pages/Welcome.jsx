import React from "react";
import { Link } from "react-router-dom";
import "../styles/welcome.css";


import welcomeImg from "../assets/welcome.png";

export default function Welcome() {
  return (
    <div className="welcome-bg">
      <div className="welcome-wrapper">
        
        
        <img
          src={welcomeImg}
          alt="SwasthyaTracker Logo"
          className="welcome-logo"
        />

        
        <div className="welcome-card">
          <h1 className="welcome-title">Welcome to SwasthyaTracker</h1>

          <p className="welcome-text">
            Your personal fitness companion — track workouts, stay fit, and achieve your goals!
          </p>

          <div className="welcome-buttons">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-ghost">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
