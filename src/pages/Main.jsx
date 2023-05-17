import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Frame from "../components/Frame";
import YesBtn from "../components/Button/Yes";
import NoBtn from "../components/Button/No";
import TypeWriterEffect from "react-typewriter-effect";

function Main() {
  return (
    <>
      <Container>
        <Image />
        <Box>
          <TypeWriterEffect
            startDelay={100}
            // style속성은 textStyle 속성에
            textStyle={{ width: "65rem", fontSize: "2.5rem", padding: "5rem" }}
            cursorColor="black"
            text="--치지치지직 여기는 우주정거장! --치직
          지금 ISS(우주정거장)이 외계인들의 침공을 받아
          심각한 상태다! 대원들은 ISS 탈환미션에 
          적극적으로 참여하길바란다!! 
          참여를 원한다면 YES... 싫다면 NO... 버튼을 눌러라."
            typeSpeed={100}
          />
        </Box>
        <BtnContainer>
          <YesBtn />
          <NoBtn />
        </BtnContainer>
      </Container>
      <Frame color="#242526" />
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
  overflow: hidden;
  z-index: 100;
`;
const Image = styled.div`
  width: 80rem;
  height: 55rem;
  margin-top: 10rem;
  background-image: url("images/mainGif.gif");
  background-size: contain;
  background-repeat: no-repeat;
`;
const Box = styled.div`
  width: 75rem;
  height: 33rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 400;
  background-image: url(images/titletext.png);
  background-size: cover;
  background-repeat: no-repeat;
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 5rem;
  margin-top: 4rem;
`;
export default Main;
