import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";
import logo from "../assets/home-logo.png"; // ensure file exists

export default function About() {
  return (
    <div className="about-page page-card">

      {/* Header Section */}
      <div className="about-header">
        <img src={logo} alt="logo" className="about-logo" />

        <div>
          <h1 className="page-heading">SwasthyTracker</h1>
          <p className="about-subtitle">Your personal fitness & wellness companion</p>
        </div>
      </div>

      <Link to="/home" className="btn ghost back-btn">
        ← Back
      </Link>

      {/* Minimal Company Intro */}
      <section className="about-section">
        <h2 className="section-title">Who We Are</h2>
        <p>
          SwasthyTracker helps you track workouts, monitor your progress, and
          follow a guided fitness routine — all in one simple dashboard.
        </p>
      </section>

      {/* Key Highlights */}
      <section className="about-section">
        <h2 className="section-title">What We Offer</h2>
        <ul>
          <li>Smart workout planning</li>
          <li>Monthly & weekly reports</li>
          <li>Health tracking (BMI & more)</li>
          <li>Personalized fitness insights</li>
        </ul>
      </section>

      {/* Mission Section */}
      <section className="about-section">
        <h2 className="section-title">Our Mission</h2>
        <p>
          Helping you stay active, healthy, and consistent — one step at a time.
        </p>
      </section>

    </div>
  );
}
