import React, { useEffect, useState } from "react";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    price: "",
    status: "active",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);
  const loadProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };
  const addProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("categoryId", form.categoryId);
    formData.append("price", form.price);
    formData.append("status", form.status);

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("✅ Product added successfully!");
      setForm({ name: "", categoryId: "", price: "", status: "active" });
      loadProducts();
    } else {
      alert("❌ Failed to add product");
    }
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
    loadProducts();
  };

  return (
    <div className="products-page">
      <h1 className="page-title">🍔 Product Management</h1>
      <p className="subtitle">Manage your food items, prices, and categories easily.</p>

      <div className="form-card">
        <h2>Add New Product</h2>
        <form onSubmit={addProduct} className="product-form">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Product Name"
            required
          />

        
          <select
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="Price (₹)"
            required
          />

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button type="submit" className="btn-primary">
            ➕ Add Product
          </button>
        </form>
      </div>

      <div className="table-container">
        <h2>Available Products</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No products found 🍽️
                </td>
              </tr>
            ) : (
              products.map((p, i) => (
                <tr key={p._id}>
                  <td>{i + 1}</td>
                  <td>{p.name}</td>
                  <td>
                    <span className="category-tag">
                      {p.categoryId?.name || "—"}
                    </span>
                  </td>
                  <td>{p.price}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        p.status === "active" ? "active" : "inactive"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => removeProduct(p._id)}
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
