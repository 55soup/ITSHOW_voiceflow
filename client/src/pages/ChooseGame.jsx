import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../components/Frame";
import styled from "styled-components";

function ChooseGame() {
  const navigator = useNavigate();
  const [gameIdx, setGameIdx] = useState(0);
  const gameTitle = [
    { text: "속담 이어말하기", url: "proverb" },
    { text: "직접 움직여라참참참!", url: "chamcham" },
    { text: "냠냠쩝쩝 과자이름 맞추기", url: "snack" },
  ];
  return (
    <>
      <Container>
        <Title>{gameTitle[gameIdx].text}</Title>
        <div>
          <NextBtn
            onClick={() => {
              gameIdx <= 0
                ? setGameIdx(gameTitle.length - 1)
                : setGameIdx(gameIdx - 1);
              console.log(gameIdx);
            }}
          >
            back
          </NextBtn>
          <NextBtn
            onClick={() => {
              gameIdx >= gameTitle.length - 1
                ? setGameIdx(0)
                : setGameIdx(gameIdx + 1);
              console.log(gameIdx);
            }}
          >
            next
          </NextBtn>
        </div>
        <Button
          onClick={() => {
            navigator(`/${gameTitle[gameIdx].url}`);
          }}
        >
          START
        </Button>
      </Container>
      <Frame />
      <UFO />
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const UFO = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("images/ufo.png");
  background-color: var(--background-main-color);
`;

const Button = styled.button`
  width: 15rem;
  height: 10rem;
  font-size: 5rem;
`;

const NextBtn = styled.button`
  width: 15rem;
  height: 10rem;
  font-size: 5rem;
`;
const Title = styled.h2`
  font-size: 6rem;
  font-weight: lighter;
  margin-top: 25rem;
`;
export default ChooseGame;
