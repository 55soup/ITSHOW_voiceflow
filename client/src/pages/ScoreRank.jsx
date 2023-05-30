/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../components/Frame";
import styled from "styled-components";

export default function ScoreRank() {
  
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8081/api/scorerank`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({name, phone, score}),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        // res 값에 따른 결과처리
        console.log(res);
      });
  
  };

  
  return (
    <>
      <Container>
        <Alien />
        <ScoreContainer>
          <Text>잘 피해라 참참참!</Text>
          <H1Text>RANK</H1Text>
          <Text style={{ fontSize: "3rem", marginTop: "3rem" }}>
            각 게임에 1등 하신분은 기프티콘을 드려요!
          </Text>
            {/* 전화번호 형식 저장 */}
            <Box>1ST&nbsp;&nbsp;<NameText>김유진</NameText>
              <Text>&nbsp;&nbsp;&nbsp;&nbsp;20005점</Text>
            </Box>
            <SmallBoxContainer>
              <SmallBox>2ST 박띵띠</SmallBox>
              <SmallBox>2ST 박띵띠</SmallBox>
              <SmallBox>2ST 박띵띠</SmallBox>
              <SmallBox>2ST 김땡댕</SmallBox>
            </SmallBoxContainer>
        </ScoreContainer>
      </Container>
      <Frame />
      <Background />
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

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("images/infoInputBack.png");
  background-repeat: no-repeat;
  background-size: cover;
`;

const Alien = styled.div`
  width: 10rem;
  height: 10rem;
  background-image: url("images/alien2.png");
  background-repeat: no-repeat;
`;

const ScoreContainer = styled.div`
  width: 70rem;
  height: 90rem;
  background-color: #0a0083;
  border: 1.5rem solid #d6d2ff;
  border-radius: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.label`
  color: white;
  font-size: 3.5rem;
`;

const H1Text = styled(Text)`
  font-size: 10rem;
`;

const NameText = styled(Text)`
  font-size: 5rem;
`;

const Box = styled.div`
  width: 60rem;
  height: 10rem;
  padding-left: 2rem;
  border: 0.5rem solid white;
  border-radius: 2rem;
  font-size: 6rem;
  color: white;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SmallBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
`

const SmallBox = styled(Box)`
  width: 28rem;
  font-size: 4rem;
`

const Button = styled.button`
  font-size: 3rem;
  background: transparent;
  color: white;
`;
