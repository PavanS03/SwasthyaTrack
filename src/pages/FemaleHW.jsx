import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/femalehw.css";

export default function FemaleHW() {
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  function calculateBMI() {
    if (!feet || !inches || !weight) {
      alert("Please enter height (ft, in) and weight");
      return;
    }

    const totalInches = Number(feet) * 12 + Number(inches);
    const heightMeters = totalInches * 0.0254; // inch → meter
    const weightKg = Number(weight);

    const bmiValue = (weightKg / (heightMeters * heightMeters)).toFixed(1);
    setBmi(bmiValue);

    let msg = "";
    if (bmiValue < 18.5) msg = "Underweight — Add nutritious meals & light strength training.";
    else if (bmiValue < 24.9) msg = "Normal — Great! Continue balanced workouts.";
    else if (bmiValue < 29.9) msg = "Overweight — Cardio + core strengthening recommended.";
    else msg = "Obese — Start guided low-impact workouts & diet control.";

    setMessage(msg);

    localStorage.setItem(
      "female_bmi",
      JSON.stringify({
        feet,
        inches,
        weight,
        bmi: bmiValue,
        message: msg,
      })
    );
  }

  return (
    <div className="hw-page">
      <h1 className="hw-title">Female Height & Weight</h1>
      <h2 className="hw-subtitle">Enter Your Details</h2>

      <div className="hw-form">
        <select value={feet} onChange={(e) => setFeet(e.target.value)}>
          <option value="">Select Height (Feet)</option>
          {[4, 5, 6].map((f) => (
            <option key={f} value={f}>{f} ft</option>
          ))}
        </select>

        <select value={inches} onChange={(e) => setInches(e.target.value)}>
          <option value="">Select Height (Inches)</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>{i} in</option>
          ))}
        </select>

        <select value={weight} onChange={(e) => setWeight(e.target.value)}>
          <option value="">Select Weight (kg)</option>
          {[35,40,45,50,55,60,65,70,75,80,85,90].map((w) => (
            <option key={w} value={w}>{w} kg</option>
          ))}
        </select>

        <button className="hw-submit-btn" onClick={calculateBMI}>
          Calculate BMI
        </button>

        {bmi && (
          <div className="hw-result">
            <h3>Your BMI: {bmi}</h3>
            <p>{message}</p>
          </div>
        )}
      </div>

      <Link to="/registrationmf">
        <button className="hw-back-btn">← Back</button>
      </Link>
    </div>
  );
}
