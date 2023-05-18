import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-kit";
import styled from "styled-components";
import Main from "./pages/Main";
import Proverb from "./pages/Proverb";
import Frame from "./components/Frame";
import Chamcham from "./pages/Chamcham";
import ChooseGame from "./pages/ChooseGame";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/proverb" element={<Proverb />} />
        <Route path="/chamcham" element={<Chamcham />} />
        <Route path="/choosegame" element={<ChooseGame />} />
      </Routes>
    </Router>
  );
};

export default App;
