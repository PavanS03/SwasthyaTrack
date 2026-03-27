import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { readJSON, writeJSON } from "../utils/reports";
import "../styles/monthlyhistory.css";

export default function MonthlyHistory() {
  const navigate = useNavigate();
  const [months, setMonths] = useState([]);

  useEffect(() => {
    setMonths(readJSON("monthReports"));
  }, []);

  function handleDelete(id) {
    if (!window.confirm("Delete this monthly report?")) return;
    const filtered = months.filter(m => m.id !== id);
    setMonths(filtered);
    writeJSON("monthReports", filtered);
  }

  if (!months.length) {
    return (
      <div className="month-page page-card">
        <h1 className="page-heading">Monthly Reports</h1>
        <p className="hint">No monthly reports yet — submit 4 weekly plans to generate one.</p>
        <Link to="/chartdisplay" className="btn ghost">← Back</Link>
      </div>
    );
  }

  return (
    <div className="month-page page-card">
      <h1 className="page-heading">Monthly Reports</h1>

      <div className="month-list">
        {months.map((m) => (
          <div className="month-card" key={m.id}>
            <div className="month-card-left">
              <div className="month-title">{new Date(m.createdAt).toLocaleString()}</div>
              <div className="month-total">Total: <span>₹</span> {m.totalCalories} cal</div>
            </div>

            <div className="month-card-actions">
              <Link to={`/monthlyreport?monthId=${m.id}`} className="btn primary small">View</Link>
              <button className="btn ghost small" onClick={() => handleDelete(m.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <Link to="/chartdisplay" className="btn ghost">← Back</Link>
      </div>
    </div>
  );
}
