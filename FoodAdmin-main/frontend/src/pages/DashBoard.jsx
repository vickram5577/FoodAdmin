import React, { useEffect, useState } from "react";
import { fetchJSON } from "../api";
import "./Dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJSON("/dashboard")
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="error-box">⚠️ {error}</div>;
  if (!data) return <div className="loading">Loading Dashboard...</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>📊 Admin Overview</h1>
        <p>Real-time insights of your food delivery platform</p>
      </header>

      {/* Stats section */}
      <div className="dashboard-grid">
        <div className="glass-card">
          <h2>{data.totalUsers}</h2>
          <p>Registered Users</p>
        </div>

        <div className="glass-card">
          <h2>{data.totalProducts}</h2>
          <p>Available Products</p>
        </div>

        <div className="glass-card">
          <h2>{data.totalOrders}</h2>
          <p>Orders Placed</p>
        </div>

        <div className="glass-card">
          <h2>₹{data.totalRevenue}</h2>
          <p>Total Revenue</p>
        </div>
      </div>

      {/* Highlights section */}
      <div className="summary-section">
        <h3>Quick Insights</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span>🧑‍💻 New Users (Week)</span>
            <strong>{data.newUsers || 0}</strong>
          </div>
          <div className="summary-item">
            <span>📦 Orders Today</span>
            <strong>{data.ordersToday || 0}</strong>
          </div>
          <div className="summary-item">
            <span>🔥 Best Category</span>
            <strong>{data.bestCategory || "—"}</strong>
          </div>
          <div className="summary-item">
            <span>💳 Avg Order Value</span>
            <strong>₹{data.avgOrderValue || 0}</strong>
          </div>
        </div>
      </div>

      {/* Activity timeline */}
      <div className="timeline-section">
        <h3>Recent Activity</h3>
        <ul className="timeline">
          <li>✅ New user registration detected</li>
          <li>🍔 Product “Veg Burger” added</li>
          <li>🧾 Order #1456 placed successfully</li>
          <li>💰 Revenue updated just now</li>
        </ul>
      </div>

      <footer className="footer">
        ⚡ Real-time Dashboard | Xcode Technologies Pvt Ltd
      </footer>
    </div>
  );
}
