import React, { useEffect, useState } from "react";
import { fetchJSON } from "../api";
import "./Users.css"; 

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", mobile: "" });

  const load = () =>
    fetchJSON("/users")
      .then(setUsers)
      .catch(console.error);

  useEffect(() => load(), []);

  const add = async (e) => {
    e.preventDefault();
    await fetchJSON("/users", { method: "POST", body: JSON.stringify(form) });
    setForm({ name: "", email: "", mobile: "" });
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await fetchJSON(`/users/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="users-page">
      <h1 className="page-title">👥 Users Management</h1>

      <div className="form-card">
        <h2>Add New User</h2>
        <form onSubmit={add} className="user-form">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full Name"
            required
          />
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email Address"
            required
          />
          <input
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            placeholder="Mobile Number"
          />
          <button type="submit" className="btn-primary">
            ➕ Add User
          </button>
        </form>
      </div>

      <div className="table-container">
        <h2>All Users</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  No users found 😴
                </td>
              </tr>
            ) : (
              users.map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.mobile || "-"}</td>
                  <td>
                    <button
                      onClick={() => remove(u._id)}
                      className="btn-delete"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
