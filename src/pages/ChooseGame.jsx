import React from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../components/Frame";
import styled from "styled-components";

function ChooseGame() {
  const navigator = useNavigate();
  return (
    <>
      <Container>
        <Title>속담 이어말하기</Title>
        <div>
          <NextBtn onClick={() => {}}>back</NextBtn>
          <NextBtn onClick={() => {}}>next</NextBtn>
        </div>
        <Button
          onClick={() => {
            navigator("/proverb");
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
`;
export default ChooseGame;
