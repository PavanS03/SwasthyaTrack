import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/adminfeedback.css";
import logo from "../assets/home-logo.png";

export default function AdminFeedback() {
  const [allFeedback, setAllFeedback] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    setAllFeedback(data);
  }, []);

  function deleteFeedback(index) {
    const updated = allFeedback.filter((_, i) => i !== index);
    setAllFeedback(updated);
    localStorage.setItem("feedbacks", JSON.stringify(updated));
  }

  function clearAll() {
    if (window.confirm("Are you sure you want to delete all feedback?")) {
      setAllFeedback([]);
      localStorage.removeItem("feedbacks");
    }
  }

  return (
    <div className="admin-page page-card">
      <div className="admin-header">
        <img src={logo} className="admin-logo" alt="logo" />
        <h1 className="page-heading">Admin Feedback Panel</h1>
        <p className="admin-subtitle">Review feedback submitted by users</p>
      </div>

      {allFeedback.length === 0 ? (
        <div className="empty-box">
          <h2>No Feedback Found</h2>
          <p>Users have not submitted any feedback yet.</p>
        </div>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Feedback</th>
              <th>Date</th>
              <th>Stars</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allFeedback.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="feedback-text">{item.feedback}</td>
                <td>{item.date}</td>
                <td className="star-col">{item.stars} ⭐</td>

                <td>
                  <button
                    className="btn delete-btn"
                    onClick={() => deleteFeedback(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="admin-actions">
        <button className="btn ghost clear-btn" onClick={clearAll}>
          Clear All Feedback
        </button>

        <Link to="/home" className="btn ghost back-btn">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}