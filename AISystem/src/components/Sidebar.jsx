
import React, { useState } from "react";
import "./Sidebar.css";

const menuItems = [
  { name: "Dashboard", icon: "🏠", path: "/" },
  { name: "Analytics", icon: "📊", path: "/analytics" },
  { name: "Users", icon: "👥", path: "/users" },
  { name: "Messages", icon: "💬", path: "/messages" },
  { name: "Settings", icon: "⚙️", path: "/settings" },
  { name: "Chat", icon: "💬", path: "/chat" },
];

const Sidebar = ({ onMenuClick }) => {
  const [active, setActive] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>My Dashboard</h2>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`sidebar-link ${
                active === item.name ? "active" : ""
              }`}
              onClick={() => {
                setActive(item.name);
                onMenuClick(item.name);
                setIsOpen(false);
              }}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link">
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
