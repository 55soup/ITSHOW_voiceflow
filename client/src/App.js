/* eslint-disable */
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-kit";
import styled from "styled-components";
import Main from "./pages/Main";
import Proverb from "./pages/Proverb";
import Snack from "./pages/Snack";
import Frame from "./components/Frame";
import Chamcham from "./pages/Chamcham";
import ChooseGame from "./pages/ChooseGame";
import GameStartCham from "./pages/GameStartCham";
import InfoInput from "./pages/InfoInput";
import ScoreRank from "./pages/ScoreRank";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/proverb" element={<Proverb />} />
        <Route path="/chamcham" element={<Chamcham />} />
        <Route path="/Snack" element={<Snack />} />
        <Route path="/startcham" element={<GameStartCham />} />
        <Route path="/choosegame" element={<ChooseGame />} />
        <Route path="/infoinput" element={<InfoInput />} />
        <Route path="/scorerank" element={<ScoreRank />} />
      </Routes>
    </Router>
  );
};

export default App;
