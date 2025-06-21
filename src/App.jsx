import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CVForm from "./pages/CVForm";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<CVForm />} />
      </Routes>
    </div>
  );
};

export default App;
