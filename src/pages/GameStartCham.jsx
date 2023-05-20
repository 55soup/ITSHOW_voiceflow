import React, { useState, useEffect, useRef } from "react";
import Frame from "../components/Frame";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 비디오 스타일을 정의한 객체
const videoStyle = {
	width: "838px",
	height: "621px",
	left: "128px",
	top: "621px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  marginLeft: "117px",
	marginTop: "-128px"
};

function Chamcham() {
  // 초기 텍스트 상태를 설정하는 useState 훅
  const [text, setText] = useState(
    "미확인 물체 발견 !! 대원은 이동할 방향을 선택해 움직여라"
  );
	  // timeLeft : 시작 3초 설정
		const [timeLeft, setTimeLeft] = useState(3);
		// 3초 간격
		const timeRef = React.useRef(Date.now());

  // useRef 훅을 사용하여 typingTextRef라는 변수 생성
  const typingTextRef = useRef(null);

  const handleTextChange = () => {
    const newText = `우주선의 운행 방식은 아래와 같다.
										1. 대원의 몸을 화면에 인식.
										2. 화면에 선택에 따라, 오른쪽, 왼쪽 방향에 따라 몸을 움직이면서 랜덤으로 이동하고 싶은 방향으로 이동`;
    // 텍스트를 변경하는 함수
    setText(newText);
    // typingTextRef의 resetTyping 함수 호출
    // // typingTextRef의 resetTyping 함수 호출
    typingTextRef.current.resetTyping();
  };

  const StartEvent = () => {
    console.log("dksd")
  }

  return (
    <div>
      <Container>
        <Heart />
        <Heart style={{ left: 244 }} />
        <Heart style={{ left: 320 }} />
        <Box>
          <TypingText text={text} ref={typingTextRef} />
        </Box>
        <video style={videoStyle} autoPlay muted loop>
          <source src="images/spacemotion.mp4" />
        </video>
				<Time>{Math.round(timeLeft)}</Time>
        <Img></Img>
      </Container>
      <Frame color={"#000000"} />
    </div>
  );
}

const TypingText = React.forwardRef(({ text }, ref) => {
  // Text 상태 변수를 생성하고 초기값을 빈 문자열로 설정
  const [Text, setText] = useState("");
  // Count 상태 변수를 생성하고 초기값을 0으로 설정
  const [Count, setCount] = useState(0);

  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 실행되는 부수 효과 함수
    const interval = setInterval(() => {
      // 0.1초마다 실행되는 인터벌 함수

      // 이전 텍스트에 새로운 글자를 추가하여 Text 상태를 업데이트
      setText((prevText) => prevText + text[Count]);
      // Count 상태를 1 증가시킴
      setCount((prevCount) => prevCount + 1);
    }, 100);

    // Count가 텍스트의 길이와 같아지면
    if (Count === text.length) {
      // 인터벌 함수를 중지시킴
      clearInterval(interval);
    }

    // 컴포넌트가 사라질 때 인터벌 함수를 정리(cleanup)
    return () => clearInterval(interval);
    // Count와 text가 변경될 때마다 부수 효과 함수가 실행
  }, [Count, text]);

  useEffect(() => {
    // 컴포넌트가 렌더링될 때와 ref가 변경될 때마다 실행되는 부수 효과 함수
    if (ref) {
      ref.current = {
        resetTyping: () => {
          setText(""); // Text 상태를 초기화
          setCount(0); // Count 상태를 초기화
        },
      };
    }
  }, [ref]); // ref가 변경될 때마다 부수 효과 함수가 실행

  return (
    <div>
      {/* 텍스트가 출력될 곳 */}
      <p className="text" style={{ fontSize: "2.8rem", padding: 65 }}>
        {Text}
      </p>
    </div>
  );
});

const Heart = styled.div`
  position: absolute;
  background-size: cover;
  z-index: 994;
  background-image: url(images/heart.png);
  width: 56px;
  height: 56px;
  left: 168px;
  top: 222px;
`;
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

const Box = styled.div`
  position: absolute;
	width: 769px;
	height: 185px;
	left: 163px;
	top: 340px;
	background-size: cover;
  background-image: url(images/smalltitletext.png);
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-size: 40px;
  font-weight: 400;
  z-index: 999;
`;

const Time = styled.div`
background-color: #ffffff;
padding: 10px 45px 10px 45px;
border-radius : 120px;
position: absolute;
width: 70px;
height: 140px;
top: 619px;
color: #000000;
font-style: normal;
font-weight: 400;
font-size: 140px;
line-height: 140px;
left: 450px;
`

const Img = styled.div`
  position: absolute;
  background-image: url(images/character2.png);
  background-position: -2rem -3rem; //정면
  /* background-position: -35rem -3rem; //왼쪽 */
  /* background-position: -65rem -3rem; //오른쪽*/
  background-repeat: no-repeat;
  width: 30rem;
  height: 32rem;
  left: 40rem;
  top: 105rem;
`;

export default Chamcham;
