import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Swasthya Tracker. All rights reserved.
    </footer>
  );
}
