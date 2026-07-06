import React, { useEffect, useState } from "react";
import { fetchJSON } from "../api";
import "./Categories.css"; 

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  const load = () => {
    fetchJSON("/categories")
      .then(setCategories)
      .catch(console.error);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    await fetchJSON("/categories", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setForm({ name: "", description: "" });
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    await fetchJSON(`/categories/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="categories-page">
      <h1 className="page-title">📂 Category Management</h1>
      <p className="subtitle">Add, view, and manage all your food categories easily.</p>

      <div className="form-card">
        <h2>Add New Category</h2>
        <form onSubmit={add} className="category-form">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Category Name"
            required
          />
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Short Description"
          />
          <button type="submit" className="btn-primary">
            ➕ Add Category
          </button>
        </form>
      </div>

      <div className="table-container">
        <h2>All Categories</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">No categories found 📭</td>
              </tr>
            ) : (
              categories.map((cat, i) => (
                <tr key={cat._id}>
                  <td>{i + 1}</td>
                  <td>{cat.name}</td>
                  <td>{cat.description || "—"}</td>
                  <td>
                    <button
                      onClick={() => remove(cat._id)}
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
