import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getRegistrations, getUsers } from "../utils/storage";

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setRegistrations(getRegistrations() || []);
    setUsers(getUsers() || []);
  }, []);


  const mergedData = useMemo(() => {
    return registrations.map((reg) => {
      const user = users.find((u) => u.username === reg.username);
      return {
        ...reg,
        email: user?.email || "-",
        phone: user?.phone || "-",
        address: user?.address || "-",
        gender: user?.gender || "-",
        age: user?.age || "-",
      };
    });
  }, [registrations, users]);

  
  const filtered = mergedData.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.username.toLowerCase().includes(q) ||
      item.courseName.toLowerCase().includes(q) ||
      item.startMonth.toLowerCase().includes(q)
    );
  });

  
  
  function exportCSV() {
    if (!filtered.length) {
      alert("No data to export.");
      return;
    }

    const header = [
      "Username",
      "Course ID",
      "Course Name",
      "Duration",
      "Start Month",
      "Age",
      "Gender",
      "Email",
      "Phone",
      "Address",
    ];

    const rows = filtered.map((d) => [
      d.username,
      d.courseId,
      d.courseName,
      `${d.duration} month(s)`,
      d.startMonth,
      d.age,
      d.gender,
      d.email,
      d.phone,
      d.address,
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `course_registrations_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  return (
    <div className="admin-dashboard page-card">

      <h1 className="page-heading">User Course Registrations</h1>

      <div className="admin-users-actions">
        <Link to="/adminhome" className="btn ghost">← Back</Link>
        <button className="btn primary" onClick={exportCSV}>Export CSV</button>
      </div>

      <input
        type="search"
        placeholder="Search username / course / month..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input search-input"
      />

      <div className="table-wrap">
        {filtered.length === 0 ? (
          <div className="empty">No registrations found.</div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Duration</th>
                <th>Start Month</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.username}</td>
                  <td>{row.courseId}</td>
                  <td>{row.courseName}</td>
                  <td>{row.duration} month(s)</td>
                  <td>{row.startMonth}</td>
                  <td>{row.age}</td>
                  <td>{row.gender}</td>
                  <td>{row.email}</td>
                  <td>{row.phone}</td>
                  <td style={{ maxWidth: "220px" }}>{row.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
