import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { saveCourseRegistration, getCourseById } from "../utils/storage";
import "../styles/courseregistration.css";


export default function CourseRegistration() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const courseId = params.get("courseId") || "";
  const courseName = params.get("courseName") || "";

  const [form, setForm] = useState({
    username: "",
    gender: "",
    age: "",
    duration: "",
    startMonth: "",
  });

  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    // Load selected course details from storage
    if (courseId) {
      const c = getCourseById(courseId);
      setSelectedCourse(c);
    }
  }, [courseId]);

  function handleInput(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    if (!form.username.trim()) return "Please enter your name.";
    if (!form.gender) return "Please select gender.";
    if (!form.age || form.age < 1) return "Please enter valid age.";
    if (!form.duration || form.duration < 1 || form.duration > 6)
      return "Duration must be between 1 and 6 months.";
    if (!form.startMonth) return "Please select start month.";
    return null;
  }

  function handleSubmit() {
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    // Save registration
    const data = {
      ...form,
      courseId,
      courseName,
    };
    saveCourseRegistration(data);

    // Navigate to pricing page
    const totalAmount = selectedCourse ? Number(selectedCourse.price) : 0;
    navigate(`/courseprice?total=${totalAmount}`);
  }

  return (
    <div className="course-reg-page page-card">
      <h1 className="page-heading">Course Registration</h1>

      <div className="course-reg-info">
        {courseId ? (
          <>
            <p><strong>Course ID:</strong> {courseId}</p>
            <p><strong>Course Name:</strong> {courseName}</p>
          </>
        ) : (
          <p>No course selected.</p>
        )}
      </div>

      <div className="course-reg-form-wrap">
        <label>
          Name:
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleInput}
            className="input"
          />
        </label>

        <label>
          Gender:
          <select name="gender" value={form.gender} onChange={handleInput} className="input">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Age:
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleInput}
            className="input"
            min="1"
          />
        </label>

        <label>
          Course Duration (1–6 months):
          <input
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleInput}
            className="input"
            min="1"
            max="6"
          />
        </label>

        <label>
          Start Month:
          <select
            name="startMonth"
            value={form.startMonth}
            onChange={handleInput}
            className="input"
          >
            <option value="">Select</option>
            {[
              "January","February","March","April","May","June",
              "July","August","September","October","November","December"
            ].map((m) => (
              <option value={m} key={m}>{m}</option>
            ))}
          </select>
        </label>

        {error && <div className="form-error">{error}</div>}

        <button className="btn primary wide" onClick={handleSubmit}>
          Proceed to Payment
        </button>

        <Link to="/course" className="btn ghost wide" style={{ marginTop: 12 }}>
          ← Back to Courses
        </Link>
      </div>
    </div>
  );
}
