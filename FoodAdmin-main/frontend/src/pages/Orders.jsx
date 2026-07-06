import React, { useEffect, useState } from "react";
import { fetchJSON } from "../api";
import "./Orders.css";

export default function Orders() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [rows, setRows] = useState([{ productId: "", quantity: 1 }]);
  const [userId, setUserId] = useState("");
  const [orderDate, setOrderDate] = useState(() => {
    // Default to today’s date (YYYY-MM-DD)
    return new Date().toISOString().split("T")[0];
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);

    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const addRow = () => setRows([...rows, { productId: "", quantity: 1 }]);

  const updateRow = (i, v) => {
    const copy = [...rows];
    copy[i] = { ...copy[i], ...v };
    setRows(copy);
  };

  const removeRow = (i) => setRows(rows.filter((_, idx) => idx !== i));

  const calcTotal = () => {
    return rows.reduce((s, r) => {
      const p = products.find((x) => x._id === r.productId);
      return s + (p ? p.price * r.quantity : 0);
    }, 0);
  };

  const submit = async (e) => {
    e.preventDefault();
    const payload = { userId, items: rows, orderDate };

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("✅ Order created successfully!");
      setRows([{ productId: "", quantity: 1 }]);
      setUserId("");
      setOrderDate(new Date().toISOString().split("T")[0]); // reset to today
    } else {
      alert("❌ Failed to create order!");
    }
  };

  return (
    <div className="orders-page">
      <h1 className="page-title">🧾 Create New Order</h1>

      <div className="order-card">
        <form onSubmit={submit}>
          {/* Select User */}
          <div className="form-section">
            <label>Select User</label>
            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            >
              <option value="">Select user</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>

          {/* Order Date */}
          <div className="form-section">
            <label>Order Date</label>
            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              required
            />
          </div>

          <h3>🛒 Order Items</h3>

          {rows.map((r, i) => (
            <div key={i} className="order-row">
              <select
                value={r.productId}
                onChange={(e) => updateRow(i, { productId: e.target.value })}
                required
              >
                <option value="">Select product</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} — ₹{p.price}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={r.quantity}
                onChange={(e) =>
                  updateRow(i, { quantity: parseInt(e.target.value) })
                }
              />

              <button
                type="button"
                className="btn-remove"
                onClick={() => removeRow(i)}
              >
                ❌
              </button>
            </div>
          ))}

          <button type="button" className="btn-add" onClick={addRow}>
            ➕ Add Item
          </button>

          <div className="order-total">
            <strong>Total:</strong> ₹{calcTotal()}
          </div>

          <button type="submit" className="btn-submit">
            ✅ Create Order
          </button>
        </form>
      </div>
    </div>
  );
}
