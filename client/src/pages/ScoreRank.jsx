/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../components/Frame";
import styled from "styled-components";

export default function ScoreRank() {
  const [data, setData] = useState();
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8081/api/scorerank`).then(response => 
      response.json().then(data => ({
          scores: data,
          status: response.status
      })
    ).then(res => {
        setData(res.scores);
        // console.log(data[0].name);
        // console.log(data);
        setDone(true);
    }));
    }, []);

  return (
    <>
      <Container>
        <Alien />
        <ScoreContainer>
          <RankText>
            <Text>잘 피해라 참참참!</Text>
            <H1Text>RANK</H1Text>
            <Text style={{ fontSize: "3rem", marginTop: "3rem" }}>
              각 게임에 1등 하신분은 기프티콘을 드려요!
            </Text>
          </RankText>
          {/* 전화번호 형식 저장 */}
          { done ? 
            <ScoreBoxContainer>
              <Box>1ST&nbsp;&nbsp;<NameText>{data[0].name}</NameText>
                <Text>{data[0].score}점</Text>
              </Box>
              <SmallBoxContainer>
                <SmallBox>2ST {data[1].name}</SmallBox>
                <SmallBox>3ST {data[2].name}</SmallBox>
                <SmallBox>4ST {data[3].name}</SmallBox>
                <SmallBox>5ST {data[4].name}</SmallBox>
              </SmallBoxContainer>
            </ScoreBoxContainer>: "데이터를 가져오는 중..."}
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

const BaseFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const ScoreContainer = styled(BaseFlex)`
  width: 70rem;
  background-color: #0a0083;
  padding: 5rem 0;
  border: 1.5rem solid #d6d2ff;
  border-radius: 3rem;
  overflow: hidden;
  `;
  
const RankText = styled(BaseFlex)`
  height: 30rem;
`
const ScoreBoxContainer = styled(BaseFlex)`
  overflow: scroll;
`;

const Text = styled.label`
  color: white;
  font-size: 3.5rem;
`;

const H1Text = styled(Text)`
  font-size: 10rem;
`;

const NameText = styled(Text)`
  width: 28rem;
  font-size: 4.5rem;
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
  height: 10rem;
  font-size: 4rem;
`

const Button = styled.button`
  font-size: 3rem;
  background: transparent;
  color: white;
`;
