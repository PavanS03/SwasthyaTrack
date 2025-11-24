import React from "react";
import { Link } from "react-router-dom";
import "../styles/registrationmf.css";

export default function RegistrationMF() {
  return (
    <div className="gender-page">
      <h1 className="gender-title">Health Information</h1>
      <h2 className="gender-subtitle">Select Your Gender</h2>

      <div className="gender-buttons">
        <Link to="/malehw" className="gender-btn">Male</Link>
        <Link to="/femalehw" className="gender-btn">Female</Link>
        <Link to="/malehw" className="gender-btn">Other</Link>
      </div>

      <Link to="/home">
        <button className="back-btn">← Back</button>
      </Link>
    </div>
  );
}
