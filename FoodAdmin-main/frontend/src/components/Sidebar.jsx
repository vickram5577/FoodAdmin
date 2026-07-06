import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserFriends, FaBox, FaClipboardList, FaLayerGroup } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🍔 FoodAdmin</h2>
      <NavLink to="/" end>
        <FaHome /> Dashboard
      </NavLink>
      <NavLink to="/users">
        <FaUserFriends /> Users
      </NavLink>
      <NavLink to="/products">
        <FaBox /> Products
      </NavLink>
      <NavLink to="/categories">
        <FaLayerGroup /> Categories
      </NavLink>
      <NavLink to="/orders">
        <FaClipboardList /> Orders
      </NavLink>
    </div>
  );
}
