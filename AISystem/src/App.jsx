
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
// import Sidebar from "./Sidebar";
// import Chat from "./Chat";


import "./App.css";

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  return (
    <div className="container">
      <Sidebar onMenuClick={setActiveMenu} />

      <main className="main-content">
        {activeMenu === "Chat" && <Chat />}
        {activeMenu === "Dashboard" && <h2>Dashboard</h2>}
      </main>
    </div>
  );
}

export default App;
