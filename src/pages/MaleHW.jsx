import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/malehw.css";

export default function MaleHW() {
  const [feet, setFeet] = useState("");
  const [inch, setInch] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  function calculateBMI() {
    if (!feet || !inch || !weight) {
      alert("Please enter height (feet & inches) and weight");
      return;
    }

    // Convert feet + inches → meters
    const totalInches = Number(feet) * 12 + Number(inch);
    const heightMeters = totalInches * 0.0254; // inches → meters
    const w = Number(weight);

    const bmiValue = (w / (heightMeters * heightMeters)).toFixed(1);
    setBmi(bmiValue);

    let msg = "";
    if (bmiValue < 18.5) msg = "Underweight — You need a muscle gain plan.";
    else if (bmiValue < 24.9) msg = "Normal — Maintain your workout routine!";
    else if (bmiValue < 29.9) msg = "Overweight — Cardio + strength recommended.";
    else msg = "Obese — Start guided workout + strict diet.";

    setMessage(msg);

    localStorage.setItem(
      "male_bmi",
      JSON.stringify({
        height: `${feet} ft ${inch} in`,
        weight,
        bmi: bmiValue,
        message: msg,
      })
    );
  }

  return (
    <div className="hw-page">
      <h1 className="hw-title">Male Height & Weight</h1>
      <h2 className="hw-subtitle">Enter Your Details</h2>

      <div className="hw-form">

        {/* Height Feet */}
        <select value={feet} onChange={(e) => setFeet(e.target.value)}>
          <option value="">Select Height (Feet)</option>
          {[4, 5, 6, 7].map((f) => (
            <option key={f} value={f}>{f} ft</option>
          ))}
        </select>

        {/* Height Inches */}
        <select value={inch} onChange={(e) => setInch(e.target.value)}>
          <option value="">Select Height (Inches)</option>
          {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => (
            <option key={i} value={i}>{i} in</option>
          ))}
        </select>

        {/* Weight */}
        <select value={weight} onChange={(e) => setWeight(e.target.value)}>
          <option value="">Select Weight (kg)</option>
          {[40,45,50,55,60,65,70,75,80,85,90,100].map((w) => (
            <option key={w} value={w}>{w} kg</option>
          ))}
        </select>

        {/* Calculate BMI */}
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
