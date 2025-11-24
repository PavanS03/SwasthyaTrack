import React, { useEffect, useState, useRef } from "react";
import { getCourses, saveCourses } from "../utils/storage";
import "../styles/AdminAddCourse.css";
function makeId() {
  return `C${Date.now().toString(36)}${Math.floor(Math.random()*9000+1000)}`;
}

export default function AdminAddCourse() {
  const initialForm = {
    id: "",
    title: "",
    goal: "",
    schedule: "",
    focus: "",
    extras: "",
    price: "",
    image: "",
  };

  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [previewSrc, setPreviewSrc] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  function resetForm() {
    setForm(initialForm);
    setPreviewSrc("");
    if (fileRef.current) fileRef.current.value = "";
    setError("");
  }

  function validateForm() {
    if (!form.title.trim()) return "Please enter course title.";
    if (!form.goal.trim()) return "Please enter goal.";
    if (!form.schedule.trim()) return "Please enter schedule.";
    if (!form.focus.trim()) return "Please enter focus.";
    if (!form.price.trim() || isNaN(Number(form.price))) return "Please enter a valid price.";
    return null;
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const MAX_SIZE = 1.5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setError("Image is too large. Choose a file smaller than 1.5 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewSrc(ev.target.result);
      setForm((prev) => ({ ...prev, image: ev.target.result }));
    };
    reader.readAsDataURL(file);
    setError("");
  }

  function handleInput(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const v = validateForm();
    if (v) {
      setError(v);
      return;
    }

    const existing = getCourses();

    if (form.id) {
      const idx = existing.findIndex((c) => c.id === form.id);
      if (idx !== -1) {
        existing[idx] = { ...form };
      }
    } else {
      const newCourse = { ...form, id: makeId() };
      existing.push(newCourse);
    }

    saveCourses(existing);
    setCourses(existing);
    resetForm();
    alert("Course saved successfully!");
  }

  function handleEdit(id) {
    const c = courses.find((item) => item.id === id);
    if (!c) return;

    setForm(c);
    setPreviewSrc(c.image || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    if (!window.confirm("Do you really want to delete this course?")) return;

    const updated = courses.filter((c) => c.id !== id);
    saveCourses(updated);
    setCourses(updated);
  }

  return (
    <div className="admin-add-course page-card">

      <h1 className="page-heading">Admin — Add / Edit Course</h1>

      <div className="form-wrap">
        <form onSubmit={handleSubmit} className="course-form">

          <input type="hidden" name="id" value={form.id} />

          <label>
            Course Title
            <input name="title" className="input" value={form.title} onChange={handleInput} />
          </label>

          <label>
            Goal
            <input name="goal" className="input" value={form.goal} onChange={handleInput} />
          </label>

          <label>
            Schedule
            <input name="schedule" className="input" value={form.schedule} onChange={handleInput} />
          </label>

          <label>
            Focus
            <input name="focus" className="input" value={form.focus} onChange={handleInput} />
          </label>

          <label>
            Extras
            <input name="extras" className="input" value={form.extras} onChange={handleInput} />
          </label>

          <label>
            Price (INR)
            <input name="price" className="input" value={form.price} onChange={handleInput} />
          </label>

          <label>
            Course Image (optional)
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="input" />
          </label>

          {previewSrc && (
            <div className="preview-box">
              <img src={previewSrc} alt="preview" />
            </div>
          )}

          {error && <div className="form-error">{error}</div>}

          <div className="form-actions">
            <button type="submit" className="btn primary">Save Course</button>
            <button type="button" className="btn ghost" onClick={resetForm}>Reset</button>
          </div>
        </form>
      </div>

      <hr />

      <h2 className="subheading">Existing Courses</h2>

      <div className="courses-list">
        {courses.length === 0 ? <div className="empty">No courses found</div> : null}

        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-left">
              {course.image ? <img src={course.image} /> : <div className="no-image">No Image</div>}
            </div>

            <div className="course-right">
              <div className="course-title">{course.title}</div>
              <div className="course-meta">ID: {course.id} • ₹{course.price}</div>
              <div className="course-desc"><strong>Goal:</strong> {course.goal}</div>
              <div className="course-desc"><strong>Schedule:</strong> {course.schedule}</div>
              <div className="course-desc"><strong>Focus:</strong> {course.focus}</div>
              <div className="course-desc"><strong>Extras:</strong> {course.extras}</div>

              <div className="course-actions">
                <button className="btn ghost" onClick={() => handleEdit(course.id)}>Edit</button>
                <button className="btn" onClick={() => handleDelete(course.id)} style={{ background: "#e03b3b", color: "#fff" }}>Delete</button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
