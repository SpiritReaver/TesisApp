import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistroContainer from "./container/Container";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistroContainer />} />
      </Routes>
    </BrowserRouter>
  );
}
