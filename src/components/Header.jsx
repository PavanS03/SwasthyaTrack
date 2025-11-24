import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/assets/logo.png" alt="SwasthyaTrack" />
        <div className="title">Swasthya Tracker</div>
      </div>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/course">Courses</Link>
        <Link to="/chartdisplay">Charts</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}
