import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { readJSON, writeJSON, pushToKey, generateId, formatDateTime } from "../utils/reports";
import "../styles/weeklyreport.css";

export default function WeeklyReport() {
  const navigate = useNavigate();

  
  const workoutData = [
    { day: "Monday", type: "Full Body Strength", details: "Squats, push-ups, planks (3x12)", calories: 300 },
    { day: "Tuesday", type: "Moderate Cardio", details: "30–40 min cycling / brisk walk", calories: 250 },
    { day: "Wednesday", type: "Mobility + Core", details: "Yoga, stretching, planks", calories: 180 },
    { day: "Thursday", type: "Upper Strength", details: "Dumbbell press, pull-ups, shoulders", calories: 280 },
    { day: "Friday", type: "HIIT Cardio", details: "20 min HIIT (1min run : 1min walk)", calories: 350 },
    { day: "Saturday", type: "Lower Strength", details: "Lunges, deadlifts, calf raises", calories: 300 },
    { day: "Sunday", type: "Rest / Light Yoga", details: "Light mobility, walk", calories: 100 },
  ];

  const [selected, setSelected] = useState(new Set());
  const [weekReports, setWeekReports] = useState([]);

  useEffect(() => {
    setWeekReports(readJSON("weekReports"));
  }, []);

  function toggleDay(i) {
    const copy = new Set(selected);
    if (copy.has(i)) copy.delete(i); else copy.add(i);
    setSelected(copy);
  }

  function submitWeek() {
    if (selected.size < 5) {
      alert("Please select at least 5 days.");
      return;
    }
    const finalList = Array.from(selected).map((i) => workoutData[i]);

   
    const weekEntry = {
      id: generateId("w-"),
      createdAt: Date.now(),
      days: finalList,
      totalCalories: finalList.reduce((s, e) => s + (Number(e.calories) || 0), 0),
      summary: finalList.map(d => d.type).join("; ")
    };

    pushToKey("weekReports", weekEntry);
    setWeekReports(readJSON("weekReports"));
    setSelected(new Set());
    alert("Weekly plan submitted!");
    navigate("/chartdisplay");
  }

  function generateMonthFromLastFour() {
    const stored = readJSON("weekReports");
    if (stored.length < 4) {
      alert("Submit 4 weekly plans to generate a monthly report.");
      return;
    }

    
    const last4 = stored.slice(-4);

    
    const typeTotals = {};
    let monthTotal = 0;
    last4.forEach((week) => {
      week.days.forEach((d) => {
        typeTotals[d.type] = (typeTotals[d.type] || 0) + (Number(d.calories) || 0);
        monthTotal += (Number(d.calories) || 0);
      });
    });

    const monthEntry = {
      id: generateId("m-"),
      createdAt: Date.now(),
      weeks: last4,
      totalsByType: typeTotals,
      totalCalories: monthTotal,
      title: `Month report — ${formatDateTime()}`
    };

    const months = readJSON("monthReports");
    months.push(monthEntry);
    writeJSON("monthReports", months);

    
    const remainingWeeks = stored.slice(0, Math.max(0, stored.length - 4));
    writeJSON("weekReports", remainingWeeks);
    setWeekReports(remainingWeeks);

    alert("Monthly report generated successfully.");
    navigate(`/monthlyreport?monthId=${monthEntry.id}`);
  }

  return (
    <div className="weekly-page page-card">
      <h1 className="page-heading">Weekly Workout Plan</h1>

      <Link to="/registrationmf" className="btn ghost">← Back</Link>

      <table className="users-table" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Day</th>
            <th>Workout Type</th>
            <th>Details</th>
            <th>Select</th>
          </tr>
        </thead>

        <tbody>
          {workoutData.map((w, i) => (
            <tr key={i}>
              <td>{w.day}</td>
              <td>{w.type}</td>
              <td>{w.details}</td>
              <td>
                <button
                  className={`btn ${selected.has(i) ? "primary" : "ghost"}`}
                  onClick={() => toggleDay(i)}
                >
                  {selected.has(i) ? "Selected" : "Select"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button className="btn primary" onClick={submitWeek}>
          Submit Weekly Plan
        </button>

        <button className="btn primary-outline" style={{ marginLeft: 12 }} onClick={generateMonthFromLastFour}>
          Generate Monthly Report
        </button>
      </div>

      <div style={{ marginTop: 28 }}>
        <h3 style={{ color: "#9aa6ad" }}>Saved weekly submissions: {weekReports.length}</h3>
      </div>
    </div>
  );
}
