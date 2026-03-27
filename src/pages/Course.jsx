import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCourses } from "../utils/storage";
import "../styles/course.css";


export default function Course() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  
  const staticCourses = [
    {
      id: "C101",
      title: "Zumba / Dance Fitness",
      goal: "Build cardio endurance and have fun",
      schedule: "3–5 sessions/week (45 mins each)",
      focus: "Rhythm, movement coordination, fat burn",
      extras: "End-of-course dance challenge",
      price: 400,
      image: "/assets/zumba.jpg",
    },
    {
      id: "C102",
      title: "Yoga & Power Yoga",
      goal: "Improve flexibility, strength & mindfulness",
      schedule: "Daily sessions (30–45 mins)",
      focus: "Breathwork, asanas, strength holds",
      extras: "Guided meditation on weekends",
      price: 450,
      image: "/assets/yoga.jpg",
    },
    {
      id: "C103",
      title: "Weight Loss Challenge (30/60 Days)",
      goal: "Kickstart fat loss with structure",
      schedule: "6 days/week (cardio + strength)",
      focus: "Caloric burn, portion control, hydration",
      extras: "Weekly weigh-in & diet planner",
      price: 500,
      image: "/assets/weightloss.jpg",
    },
  ];

  
  useEffect(() => {
    const stored = getCourses();
    const staticIds = new Set(staticCourses.map((c) => c.id));
    const merged = [...staticCourses];

   
    stored.forEach((c) => {
      if (!staticIds.has(c.id)) merged.push(c);
    });

    setCourses(merged);
  }, []);

  function handleEnroll(course) {
    navigate(
      `/courseregistration?courseId=${course.id}&courseName=${encodeURIComponent(
        course.title
      )}`
    );
  }

  return (
    <div className="course-page page-card">
      <h1 className="page-heading">Fitness & Wellness Courses</h1>

      <div className="course-grid">
        {courses.map((course) => (
          <div className="course-card-big" key={course.id}>
            <div className="course-big-left">
              {course.image ? (
                <img src={course.image} alt={course.title} />
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>

            <div className="course-big-right">
              <h2>{course.title}</h2>
              <p><strong>Course ID:</strong> {course.id}</p>
              <p><strong>Goal:</strong> {course.goal}</p>
              <p><strong>Schedule:</strong> {course.schedule}</p>
              <p><strong>Focus:</strong> {course.focus}</p>
              <p><strong>Extras:</strong> {course.extras}</p>
              <p><strong>Price:</strong> ₹{course.price}</p>

              <button
                className="btn primary enroll-btn"
                onClick={() => handleEnroll(course)}
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <Link to="/home" className="btn ghost">← Back</Link>
      </div>
    </div>
  );
}
