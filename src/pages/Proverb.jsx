import React, { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import styled from "styled-components";
import Frame from "../components/Frame";

function PRoverb() {
  const proverbFront = [
    "가는 날이",
    "아닌 밤중에",
    "벼룩도",
    "소 귀에",
    "소 잃고",
    "얌전한 고양이가",
    "계란으로",
    "개구리",
    "똥 묻은 개가",
    "우물 안",
    "콩 심은데 콩 나고",
    "말이",
    "수박",
  ];
  const proverbBack = [
    "장날이다",
    "홍두깨",
    "낯짝이있다",
    "경 읽기",
    "외양간 고친다",
    "부뚜막에 올라간다",
    "바위 치기",
    "올챙이 적 생각 못 한다",
    "겨 묻은 개 나무란다",
    "개구리",
    "팥 심은데 팥 난다",
    "씨가 된다",
    "겉핥기",
  ];
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      setValue(result);
    },
  });
  let [idx, setIdx] = useState(0);
  let [count, setCount] = useState(0);
  let [correct, setCorrect] = useState(false);

  useEffect(() => {
    setCorrect(proverbBack[idx] === value);
    if (correct) {
      console.log(correct);
      setValue("");
      // proverbBack[idx] === value 가 true => 정답, 다음문제로 넘어감(idx가 바뀜. 인식)
      setIdx(Math.floor(Math.random() * (proverbFront.length - 1)) + 1);
      setCorrect(false);
      setCount(count + 1);
      // console.log(`${correct} ${idx} 값이 바뀌었음.`);
    }
  }, [value, idx]);

  // toggle버튼 관리
  const [toggle, setToggle] = useState(false);

  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  function toNext() {
    setIdx(Math.floor(Math.random() * (proverbFront.length - 1)) + 1);
  }

  return (
    <>
      <Container>
        <SpeechBubble rotate={"rotate(180deg)"}>
          <SpeechText rotate={"rotate(180deg)"} padding={"7.2rem"}>
            {correct
              ? proverbFront[
                  Math.floor(Math.random() * (proverbFront.length - 1)) + 1
                ]
              : proverbFront[idx]}
          </SpeechText>
        </SpeechBubble>
        <SpeechBubble rotate={"rotate(0deg)"}>
          <SpeechText rotate={"rotate(0deg)"} padding={"2.8rem"}>
            {value}
          </SpeechText>
        </SpeechBubble>
        <CorrectStyle style={correct ? { color: "green" } : { color: "red" }}>
          {correct ? "맞았어!" : "땡"}
        </CorrectStyle>
        <RecordButton
          onClick={() => {
            clickedToggle();
            !toggle ? listen({ interimResults: true }) : stop();
          }}
          toggle={toggle}
        >
          🎤
        </RecordButton>
        {listening && <div>음성인식 활성화 중</div>}
        <button onClick={toNext}>></button>
        <div style={{ color: "white" }}>count: {count}</div>
      </Container>
      <Frame color={"#242526"} />
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

const SpeechBubble = styled.div`
  width: 45rem;
  height: 13rem;
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
  font-size: 3rem;
  transform: ${(props) => props.rotate};
`;

const RecordButton = styled.button`
  width: 10vw;
  height: 4vw;
  background-color: ${(props) => (props.toggle ? "red" : "none")};
  border-radius: 5rem;
  border: 0;
`;

const CorrectStyle = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: green;
`;
export default PRoverb;
