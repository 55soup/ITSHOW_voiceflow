import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-kit";
import styled from "styled-components";
import Frame from "../components/Frame";
import Alien from "../components/Alien"

function Proverb() {
  const navigator = useNavigate();
  const [value, setValue] = useState();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      setValue(result);
    },
  });
  let [idx, setIdx] = useState(0);
  let [count, setCount] = useState(0);
  let [correct, setCorrect] = useState(false);
  
  // toggle버튼 관리
  const [toggle, setToggle] = useState(false);
  
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };
  
  // function toNext() {
    //   setIdx(Math.floor(Math.random() * (proverbFront.length - 1)) + 1);
    // }
  
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
    }, 50);

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
        style={{ fontSize: "2.5rem", topPadding: '4vw', lineHeight: "3rem" }}
      >
        {Text}
      </p>
    </div>
  );
});
/** 텍스트typing animation */ 

const [text, setText] = useState("신서유기 속담게임으로 담판을 짓는다.");
const [nextText, setNextText] = useState([
  "내가 속담 앞부분을 말하면 뒤에 \n부분을 이어 말하면 된다.",
  "한번 해볼까? 삐리빠라뽀. \n밑에 마이크모양 버튼을 눌러라.",
  "버튼이 빨간색이 됐다면 마이크에 \n대고 [외계인님 감사합니다] 라고 외쳐!"
])
const [textIdx, setTextIdx] = useState(0);
// useRef 훅을 사용하여 typingTextRef라는 변수 생성
const typingTextRef = useRef(null);
if(value==="외계인님 감사합니다") {
  // setText("좋았어.ㅋ 그런식으로 답하면 된다. 시작해볼까?")
  setTimeout(()=>{
    navigator("/startproverb");
  }, 5000);
}

const handleTextChange = () => {
  setTextIdx(textIdx+1);
  setText(nextText[textIdx]);
  if(textIdx===2){ //오랫동안 말하지 않을시
    setTimeout(()=>{
      setText("...왜 안하는건가?ㅋ");
    }, 8000)
  }
  // typingTextRef의 resetTyping 함수 호출
  typingTextRef.current.resetTyping();
};

  return (
    <>
      <Container>
        {/* <Timer count={count}/> */}
        <Text style={{position: 'absolute', right: '13vw', top: '22vw', cursor: 'pointer'}} onClick={()=>{navigator("/startproverb")}}>SKIP</Text>
        <img src="/images/proverb/ufo.png" alt="ufo"/>
        <Alien />
        <div style={{display: 'flex', gap: '10rem'}}>
          <img src="/images/proverb/rocket.png" alt="rocket"/>
          <img src="/images/proverb/rocket.png" alt="rocket"/>
          <img src="/images/proverb/rocket.png" alt="rocket"/>
        </div>
        <SpeechBubble rotate={"rotate(180deg)"}>
          <SpeechText style={{fontSize: "3.5rem"}} rotate={"rotate(180deg)"} padding={"13vw"}>
            <TypingText text={text} ref={typingTextRef} />
          </SpeechText>
        </SpeechBubble>
        <NextBtn textIdx={textIdx} onClick={handleTextChange}>NEXT</NextBtn>
        <SpeechBubble rotate={"rotate(0deg)"}>
          <SpeechText rotate={"rotate(0deg)"} padding={"5vw"}>
            {value}
          </SpeechText>
        </SpeechBubble>
        <RecordButton
        onClick={() => {
          clickedToggle();
          !toggle ? listen({ interimResults: true }) : stop();
        }}
        toggle={toggle}>
        🎤
      </RecordButton>
      {listening && <div>음성인식 활성화 중</div>}
      </Container>
      <Frame color={"var(--background-main-color)"} />
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

const Text = styled.div`
  font-size: 5rem;
  color: white;
`
const SpeechBubble = styled.div`
  width: 200vw;
  height: 22vw;
  background-image: url("images/speechbubble.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  transform: ${(props) => props.rotate};
  display: flex;
  justify-content: center;
`;

const SpeechText = styled.div`
  padding-top: ${(props) => props.padding};
  font-size: 4.5vw;
  transform: ${(props) => props.rotate};
`;

const RecordButton = styled.button`
  width: 10vw;
  height: 4vw;
  background-color: ${(props) => (props.toggle ? "red" : "none")};
  border-radius: 5rem;
  border: 0;
`;

const NextBtn = styled.div`
  color: white;
  padding-left: 55rem;
  font-size: 5rem;
  cursor: pointer;
  visibility: ${(props)=>props.textIdx===3? "hidden": "visiable"};
`;
export default Proverb;

