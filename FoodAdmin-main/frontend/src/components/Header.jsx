import React from "react";
import { FaUserCircle, FaCog } from "react-icons/fa";

export default function Header() {
  return (
    <header className="header">
      <h3>Food Delivery Admin Panel</h3>
      <div className="profile">
        <FaCog size={20} style={{ marginRight: "15px" }} />
        <FaUserCircle size={32} />
      </div>
    </header>
  );
}
