import React, { useState, useEffect, useRef } from "react";
import Frame from "../components/Frame";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";

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
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };
  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };

  const backgroundColor = isHovered ? "#6A68CE" : "#BABABA";
  const backgroundColor2 = isHovered2 ? "#6A68CE" : "#BABABA";  

  const StartEvent = () => {
    navigate("/chamcham");
  };
  const StartEvent2 = () => {
    navigate("/choosegame");
  };


  return (
    <div>
      <Container>
				<Text style={{top: 2, fontSize: 88, color: 'white'}}>참참참 GAME</Text>
				<Text style={{top: 145, fontSize: 66, color:'red'}}>MISSION.</Text>
				<Text style={{top: 221}}>제한 시간까지 <br/>우주선을 보호해라.</Text>
        <Gchild
          style={{ left: 287, backgroundColor:backgroundColor }}
          onClick={StartEvent}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          YES
        </Gchild>
        <Gchild
          style={{ left: 566, backgroundColor: backgroundColor2 }}
          onClick={StartEvent2}
          onMouseEnter={handleMouseEnter2}
          onMouseLeave={handleMouseLeave2}
        >
          NO
        </Gchild>
				<Img></Img>
      </Container>
      <Frame color={"#000000"} />
    </div>
  );
}
const Text2 = styled.div`
    width: 737px;
    height: 349px
    color: white;
    z-index: 999;
    font-size: 30px;
`
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
  position: absolute;
	top: 570px;
	border: none;
  width: 188px;
  height: 188px;
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
