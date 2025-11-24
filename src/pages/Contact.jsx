import React from "react";
import { Link } from "react-router-dom";
import "../styles/contact.css";
import logo from "../assets/home-logo.png";   // ✅ Your logo

export default function Contact() {
  return (
    <div className="page-card contact-page">

      {/* 🔥 Logo + Heading Section */}
      <div className="contact-header">
        <img src={logo} alt="logo" className="contact-logo" />

        <h1 className="page-heading">SwasthyTracker</h1>
        <h2 className="subheading">Contact Us</h2>
      </div>

      {/* Back button */}
      <Link to="/home" className="btn ghost back-btn">
        ← Back
      </Link>

      {/* Contact Info */}
      <div className="contact-box">
        <p>
          <strong>Email:</strong> swasthy2025tracker@gmail.com <br /><br />
          <strong>Contact:</strong> 080-1400411 <br /><br />
          <strong>Address:</strong> <br />
          No.188, New Post Office Road, <br />
          2th Block Jayanagar, <br />
          Bengaluru – 560040
        </p>
      </div>

      <h2 className="subheading">Our Branches</h2>
      <h3 className="subheading small">Locations on Map</h3>

      {/* Maps */}
      <div className="contact-map-container">
        <iframe
          title="Map-1"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31108.98723648627!2d77.53984391083985!3d12.9319091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae159a8426861f%3A0x8c394a88337c7f30!2sEmerge%20private%20fitness%20studio!5e0!3m2!1sen!2sin!4v1746815493267!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
        ></iframe>

        <iframe
          title="Map-2"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62217.97447297254!2d77.50379502167972!3d12.9319091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae159a8426861f%3A0x8c394a88337c7f30!2sEmerge%20private%20fitness%20studio!5e0!3m2!1sen!2sin!4v1747073382167!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
