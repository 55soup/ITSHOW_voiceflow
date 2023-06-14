import React, { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import styled from "styled-components";
import Frame from "../components/Frame";
import Timer from "../components/Timer";
import Alien from "../components/Alien";

function GameStartProverb() {

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
    "수박",
    "발 없는 말이",
    "가는 말이 고와야",
    "낮말은 새가 듣고",
    "열 손가락 깨물어서",
    "낫 놓고",
    "등잔밑이",
    "고래싸움에",
    "세살 버릇이",
    "웃는 사람 얼굴에",
    "뛰는 놈 위에",
    "꿩 대신",
    "빛 좋은",
    "백지장도",
    "티끌모아",
    "금강산도",
  ];
  const proverbBack = [
    "장날이다",
    "홍두깨",
    "낯짝이있다",
    "경 읽기",
    "외양간 고친다",
    "부뚜막에 올라간다", // 부뚜막, 올라 (특정 단어만 있어도 통과)
    "바위 치기",
    "올챙이 적 기억 못 한다",
    "겨 묻은 개 나무란다",
    "개구리",
    "팥 심은데 팥 난다",
    "겉핥기",
    "천리 간다",
    "오는 말이 곱다",
    "밤말은 쥐가 듣는다",
    "안 아픈 손가락 없다",
    "기역자도 모른다",
    "어둡다",
    "새우 등 터진다",
    "여든까지 간다",
    "침 못 뱉는다",
    "나는 놈 있다",
    "닭",
    "개살구",
    "맞들면 낫다",
    "태산",
    "식후경",
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
  // toggle버튼 관리
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (proverbBack[idx] === value) {
      // 말한 답이 정답과 일치하는가?
      setCorrect(true);
    }
  }, [idx, value]);

  useEffect(() => {
    if (correct) {
      // 2초 후 => (대답 비우기, 문제 바꾸기, count +1, correct -> false)
      const timeoutId = setTimeout(() => {
        setValue("");
        // proverbBack[idx] === value 가 true => 정답, 다음문제로 넘어감(idx가 바뀜. 인식)
        setIdx((prevIdx) => {
          let nextIdx =
            Math.floor(Math.random() * (proverbFront.length - 1)) + 1;
          while (nextIdx === prevIdx) {
            // 새로운 문제가 이전 문제와 동일한 경우, 새로운 문제 다시 뽑기.
            nextIdx = Math.floor(Math.random() * (proverbFront.length - 1)) + 1;
          }
          return nextIdx;
        });
        setCount((prevCount) => prevCount + 1);
        setCorrect(false); // 맞춘 후 다시 correct -> false로
      }, 2000);
      // 이전에 등록한 timeout을 clear 하기 위해 return 하여 clear 함수를 등록합니다.
      return () => clearTimeout(timeoutId);
    }
  }, [correct, proverbFront.length]);

  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  function toNext() {
    setIdx(Math.floor(Math.random() * (proverbFront.length - 1)) + 1);
  }

  return (
    <>
      <Container>
        {/* <Timer count={count} second={60} start={false}/> */}
        <div style={{ color: "white", fontSize: "5rem" }}>score: {count}</div>
        <img src="/images/proverb/ufo.png" alt="ufo"/>
        <Alien />
        <div style={{display: 'flex', gap: '10rem'}}>
          <img src="/images/proverb/rocket.png" alt="rocket"/>
          <img src="/images/proverb/rocket.png" alt="rocket"/>
          <img src="/images/proverb/rocket.png" alt="rocket"/>
        </div>
        <SpeechBubble rotate={"rotate(180deg)"}>
          <SpeechText rotate={"rotate(180deg)"} padding={"13vw"}>
            {proverbFront[idx]}
          </SpeechText>
        </SpeechBubble>
        <SpeechBubble rotate={"rotate(0deg)"}>
          <SpeechText rotate={"rotate(0deg)"} padding={"5vw"}>
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

const CorrectStyle = styled.div`
  font-size: 5rem;
  font-weight: 800;
  color: green;
`;
export default GameStartProverb;

