import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, saveUsers } from "../utils/storage";

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const allUsers = getUsers() || [];
    setUsers(allUsers);
  }, []);

  // Filter + Sort
  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    let list = [...users];

    if (q) {
      list = list.filter((u) =>
        [u.username, u.email, u.phone]
          .filter(Boolean)
          .some((val) => val.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => {
      const A = (a.username || "").toLowerCase();
      const B = (b.username || "").toLowerCase();
      return sortAsc ? A.localeCompare(B) : B.localeCompare(A);
    });

    return list;
  }, [users, filter, sortAsc]);

  // Delete user
  function handleDelete(username) {
    if (!window.confirm(`Delete user "${username}"?`)) return;

    const updated = users.filter((u) => u.username !== username);
    saveUsers(updated);
    setUsers(updated);
  }

  // Export as CSV
  function exportCSV() {
    if (!users.length) {
      alert("No users to export.");
      return;
    }

    const header = ["Username", "Age", "Email", "Phone", "Gender", "Role"];
    const rows = users.map((u) => [
      u.username || "",
      u.age || "",
      u.email || "",
      u.phone || "",
      u.gender || "",
      u.role || "user",
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((v) => `"${String(v)}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "swasthy_users.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="admin-users-page page-card">
      {/* Header */}
      <div className="admin-users-header">
        <h1 className="page-heading">Registered Users</h1>

        <div className="admin-users-actions">
          <Link to="/adminhome" className="btn ghost">← Back</Link>

          <button
            onClick={() => setSortAsc((v) => !v)}
            className="btn primary-outline"
          >
            Sort: {sortAsc ? "A → Z" : "Z → A"}
          </button>

          <button onClick={exportCSV} className="btn primary">
            Export CSV
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="admin-users-controls">
        <input
          type="search"
          placeholder="Search username, email, phone..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input search-input"
        />

        <div className="users-count">
          Showing {filtered.length} / {users.length}
        </div>
      </div>

      {/* Table */}
      <div className="table-wrap">
        {filtered.length === 0 ? (
          <div className="empty">No users found.</div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Age</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Role</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u, i) => (
                <tr key={i}>
                  <td>{u.username}</td>
                  <td>{u.age}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>{u.gender}</td>
                  <td>{u.role || "user"}</td>

                  <td style={{ textAlign: "center" }}>
                    <button
                      className="btn ghost small"
                      onClick={() => alert(JSON.stringify(u, null, 2))}
                    >
                      View
                    </button>

                    <button
                      className="btn danger small"
                      onClick={() => handleDelete(u.username)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
