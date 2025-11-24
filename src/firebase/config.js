// src/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6yHcQ5St1WsHZRBcGZ2Wd__yPNKD_hvA",
  authDomain: "swasthytracker.firebaseapp.com",
  projectId: "swasthytracker",
  storageBucket: "swasthytracker.appspot.com",
  messagingSenderId: "392984754766",
  appId: "1:392984754766:web:1b9e17b4e6ef66a34e211f",
  measurementId: "G-ZR7RE48HCS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

let analytics;
try { analytics = getAnalytics(app); } catch (e) { console.log("Analytics unavailable locally"); }
