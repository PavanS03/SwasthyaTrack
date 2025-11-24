import React from "react";
import { Routes, Route } from "react-router-dom";

// Import all pages  
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from "./pages/Home";

import Course from "./pages/Course";
import CourseRegistration from "./pages/CourseRegistration";
import CoursePrice from "./pages/CoursePrice";

import AdminHome from "./pages/AdminHome";
import AdminAddCourse from "./pages/AdminAddCourse";
import AdminUser from "./pages/AdminUser";
import AdminDashboard from "./pages/AdminDashboard";

import WeeklyReport from "./pages/WeeklyReport";
import MonthlyReport from "./pages/MonthlyReport";
import MonthlyHistory from "./pages/MonthlyHistory";   // <-- Added
import ChartDisplay from "./pages/ChartDisplay";

import RegistrationMF from "./pages/RegistrationMF";
import MaleHW from "./pages/MaleHW";
import FemaleHW from "./pages/FemaleHW";

import About from "./pages/About";
import Contact from "./pages/Contact";

import Feedback from "./pages/Feedback";                // <-- Added

export default function App() {
  return (
    <Routes>

      {/* Authentication / Welcome */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Home */}
      <Route path="/home" element={<Home />} />

      {/* Courses */}
      <Route path="/course" element={<Course />} />
      <Route path="/courseregistration" element={<CourseRegistration />} />
      <Route path="/courseprice" element={<CoursePrice />} />

      {/* Admin Routes */}
      <Route path="/adminhome" element={<AdminHome />} />
      <Route path="/adminaddcourse" element={<AdminAddCourse />} />
      <Route path="/adminuser" element={<AdminUser />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />

      {/* Workout Reports */}
      <Route path="/weeklyreport" element={<WeeklyReport />} />
      <Route path="/monthlyreport" element={<MonthlyReport />} />
      <Route path="/monthlyhistory" element={<MonthlyHistory />} />  {/* <-- Added */}
      <Route path="/chartdisplay" element={<ChartDisplay />} />

      {/* Health / BMI */}
      <Route path="/registrationmf" element={<RegistrationMF />} />
      <Route path="/malehw" element={<MaleHW />} />
      <Route path="/femalehw" element={<FemaleHW />} />

      {/* General Info */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Feedback Page */}
      <Route path="/feedback" element={<Feedback />} />  {/* <-- Added */}

    </Routes>
  );
}
