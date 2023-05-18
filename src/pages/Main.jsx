import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Frame from "../components/Frame";
import YesBtn from "../components/Button/Yes";
import NoBtn from "../components/Button/No";
import { useNavigate } from "react-router-dom";

function Main() {
  // useNavigate 훅을 사용하여 navigate 함수를 받아옴
  const navigate = useNavigate();
  // "/" 경로로 이동하는 함수
  const toChoose = () => {
    navigate("/choosegame");
  };

  // 초기 텍스트 상태를 설정하는 useState 훅
  const [text, setText] = useState(
    `--치지치지직 여기는 우주정거장! --치직 지금 ISS(우주정거장)이 외계인들의 침공을 받아 심각한 상태다! 대원들은 ISS 탈환미션에 적극적으로 참여하길바란다! 참여를 원한다면 YES... 싫다면 NO... 버튼을 눌러라.`
  );

  // useRef 훅을 사용하여 typingTextRef라는 변수 생성
  const typingTextRef = useRef(null);

  const handleTextChange = () => {
    const newText = `오케이 롸져!`;
    // 텍스트를 변경하는 함수
    setText(newText);
    // typingTextRef의 resetTyping 함수 호출
    // // typingTextRef의 resetTyping 함수 호출
    typingTextRef.current.resetTyping();
    setTimeout(() => {
      toChoose(); // 다음 페이지로 이동
    }, 3000);
  };
  return (
    <>
      <Container>
        <Image />
        <Box>
          <TypingText text={text} ref={typingTextRef} />
        </Box>
        <BtnContainer>
          <YesBtn onClick={handleTextChange} />
          <NoBtn />
        </BtnContainer>
      </Container>
      <Frame color="var(--background-main-color)" />
    </>
  );
}

/** 텍스트typing animation */
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
      <p
        className="text"
        style={{ fontSize: "2.5rem", padding: 75, lineHeight: "3rem" }}
      >
        {Text}
      </p>
    </div>
  );
});
/** 텍스트typing animation */

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
  margin-tochoosep: 10rem;
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
  margin-tochoosep: 4rem;
`;
export default Main;
