import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WatchWidget from "./components/WatchWidget";
import ChatInterface from "./components/ChatInterface";

function App() {
  return (
    <div className="w-80 h-[480px] overflow-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<WatchWidget />} />
          <Route path="/chat" element={<ChatInterface />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
