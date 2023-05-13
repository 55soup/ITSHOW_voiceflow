import "./App.css";
import React, { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import styled from "styled-components";
import Proverb from "./pages/Proverb";
import Frame from "./components/Frame";

const App = () => {
  return (
    <>
      {/* <Proverb /> */}
      <Frame color={"#ff0000"} />
    </>
  );
};

export default App;
