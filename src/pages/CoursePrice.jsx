import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/courseprice.css";

export default function CoursePrice() {
  const [params] = useSearchParams();
  const total = Number(params.get("total")) || null;   // FIXED ✔ always numeric

  // UPI Configuration
  const upiId = "pavan123@upi"; 
  const upiName = "Pavan";

  const upiData = `upi://pay?pa=${upiId}&pn=${upiName}&am=${total || ""}&cu=INR`;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    upiData
  )}&size=260x260`;

  return (
    <div className="payment-page">
      <h1 className="page-heading">Complete Your Payment</h1>

      <div className="payment-box">
        <h2>SwasthyaTrack</h2>

        {/* Show Amount ONLY if valid price */}
        {total ? (
          <div className="payment-amount">
            Amount: <span>₹{total}</span>
          </div>
        ) : null}

        <img src={qrUrl} alt="UPI QR Code" className="qr-img" />

        <p className="payment-note">
          Scan this QR code with any UPI app to complete the payment.
        </p>
      </div>

      <div className="payment-actions">
        <Link to="/course" className="btn ghost">← Back</Link>
      </div>
    </div>
  );
}
