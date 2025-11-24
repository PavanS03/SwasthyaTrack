import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/feedback.css";
import logo from "../assets/home-logo.png";

export default function Feedback() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleSubmit() {
    if (rating === 0) {
      alert("Please select a star rating.");
      return;
    }
    if (!feedback.trim()) {
      alert("Please enter your feedback.");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    stored.push({
      rating,
      feedback,
      date: new Date().toLocaleString(),
    });
    localStorage.setItem("feedbacks", JSON.stringify(stored));

    alert("Thank you for your valuable feedback! ⭐");
    navigate("/login");
  }

  return (
    <div className="feedback-page">

      {/* Header Section */}
      <div className="feedback-header">
        <img src={logo} alt="logo" className="feedback-logo" />

        <h1 className="feedback-title">Your Feedback Matters</h1>
        <p className="feedback-subtitle">Help us improve SwasthyTracker</p>
      </div>

      {/* ⭐ Star Rating */}
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= (hover || rating) ? "star filled" : "star"}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        className="feedback-box"
        placeholder="Share your experience..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      ></textarea>

      {/* Buttons */}
      <div className="feedback-actions">
        <button className="btn primary submit-btn" onClick={handleSubmit}>
          Submit Feedback
        </button>

        <Link to="/home" className="btn ghost back-btn">
          ← Back
        </Link>
      </div>
    </div>
  );
}
