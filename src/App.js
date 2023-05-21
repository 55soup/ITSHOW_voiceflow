import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-kit";
import styled from "styled-components";
import Main from "./pages/Main";
import Proverb from "./pages/Proverb";
import Snack from "./pages/Snack"
import Frame from "./components/Frame";
import Chamcham from "./pages/Chamcham";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/proverb" element={<Proverb />} />
        <Route path="/chamcham" element={<Chamcham />} />
        <Route path="/Snack" element={<Snack />} />
      </Routes>
    </Router>
  );
};

export default App;
