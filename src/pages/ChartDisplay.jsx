import React from "react";
import { Link } from "react-router-dom";
import "../styles/chartdisplay.css";


export default function ChartDisplay() {
  function resetMonthlyData() {
    if (window.confirm("Are you sure you want to reset all monthly workout data?")) {
      localStorage.removeItem("weekReports");
      alert("Monthly data reset successfully.");
    }
  }

  return (
    <div className="page-card chart-page">
      <h1 className="page-heading">Workout Progress</h1>

      <div className="chart-options">
        <Link to="/weeklyreport" className="btn primary chart-btn">
          Weekly Workout Plan
        </Link>

        <Link to="/monthlyreport" className="btn primary chart-btn">
          Monthly Workout Report
        </Link>

        <button className="btn ghost chart-btn reset-btn" onClick={resetMonthlyData}>
          Reset Monthly Data
        </button>
      </div>

      <Link to="/home" className="btn ghost" style={{ marginTop: "40px" }}>
        ← Back to Home
      </Link>
    </div>
  );
}
