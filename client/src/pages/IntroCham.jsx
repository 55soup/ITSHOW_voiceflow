import React, { useState, useEffect, useRef } from "react";
import Frame from "../components/Frame";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 비디오 스타일을 정의한 객체
const videoStyle = {
  width: "838px",
  height: "1860px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  marginLeft: "117px",
};

function Chamcham() {

  // useNavigate 훅을 사용하여 navigate 함수를 받아옴
  const navigate = useNavigate();
  // "/" 경로로 이동하는 함수
  const StartEvent = () => {
    navigate("/chamcham");
  };


  return (
    <div>
      <Container>
				<Text style={{top: 88, fontSize: 88}}>참참참 GAME</Text>
				<Text style={{top: 270, fontSize: 66}}>MISSION.</Text>
				<Text style={{top: 350}}>제한 시간까지 <br/>우주선을 보호해라.</Text>
				<Gchild style={{left: 234, }}>YES</Gchild>
				<Gchild style={{left: 566, }}>NO</Gchild>
				<Img></Img>
      </Container>
      <Frame color={"#000000"} />
    </div>
  );
}

const Container = styled.div`
  width: 100%;
	top: 281px;
  height: 100vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 100;
`;	

const Gchild = styled.button`
	background-color: #BABABA;
  position: absolute;
	top: 570px;
	border: none;
  width: 232px;
  height: 232px;
  border-radius: 150px;
  color: #FFFFFF;
  font-size: 88px;
  z-index: 999;
`;

const Text = styled.button`
	background-color: black;
  position: absolute;
  font-size: 70px;
  border: none;
  color: #BABABA;
	display: flex;
	display: flex;
  justify-content: center;
  align-items: center;
  top: 10px,
  z-index: 6;
`;

const Img = styled.div`
  position: absolute;
  // background-image: url(images/character2.png);
  background-image: url(images/alientintor.png);
  // background-position: -2rem -3rem; //정면
  /* background-position: -35rem -3rem; //왼쪽 */
  /* background-position: -65rem -3rem; //오른쪽*/
  background-repeat: no-repeat;
  position: absolute;
  width: 869px;
  height: 945px;
  left: -37px;
  top: 393px;
	background-size: cover;
`;

export default Chamcham;
