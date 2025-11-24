// src/pages/MonthlyReport.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Chart from "chart.js/auto";
import { readJSON } from "../utils/reports";
import "../styles/monthlyreport.css";

export default function MonthlyReport() {
  const [params] = useSearchParams();
  const monthId = params.get("monthId");
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [month, setMonth] = useState(null);

  useEffect(() => {
    const months = readJSON("monthReports");
    if (!months.length) {
      setMonth(null);
      return;
    }
    let selected = null;
    if (monthId) selected = months.find(m => m.id === monthId);
    if (!selected) selected = months[months.length - 1];
    setMonth(selected);
  }, [monthId]);

  useEffect(() => {
    if (!month) return;
    const ctx = canvasRef.current.getContext("2d");

    // prepare data
    const labels = Object.keys(month.totalsByType || {});
    const data = labels.map(l => month.totalsByType[l]);

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Calories burned",
            data,
            backgroundColor: "#22c1a9",
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [month]);

  if (!month) {
    return (
      <div className="month-page page-card">
        <h1 className="page-heading">Monthly Workout Report</h1>
        <div className="empty" style={{ marginTop: 30 }}>
          <h2>No monthly report yet</h2>
          <p>Submit 4 weekly plans to generate a month summary.</p>
        </div>
        <Link to="/chartdisplay" className="btn ghost" style={{ marginTop: 20 }}>← Back</Link>
      </div>
    );
  }

  return (
    <div className="month-page page-card">
      <h1 className="page-heading">Monthly Workout Report</h1>

      <Link to="/chartdisplay" className="btn ghost">← Back</Link>

      <div className="month-box">
        <h2>Total Calories Burned: {month.totalCalories}</h2>

        <div className="chart-container">
          <canvas ref={canvasRef} id="monthChart" height="220"></canvas>
        </div>

        <div className="month-breakdown">
          <h3>Weekly Breakdown</h3>
          {month.weeks.map((w, idx) => (
            <div key={w.id} className="week-summary">
              <div className="week-title">Week {idx + 1} — {new Date(w.createdAt).toLocaleDateString()}</div>
              <div className="week-stats">Calories: {w.totalCalories}</div>
              <div className="week-items">
                {w.days.map((d, i) => (
                  <div key={i} className="day-item">
                    <strong>{d.day}:</strong> {d.type} — {d.calories} cal
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <Link to="/monthlyhistory" className="btn ghost">View All Months</Link>
      </div>
    </div>
  );
}
