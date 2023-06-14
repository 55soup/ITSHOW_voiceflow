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
    "자다가",
    "우물 에서",
    "가랑비에",
    "쥐구멍에도",
    "닭 쫓던 개",
    "사공이 많으면 배가",
    "될 성 부른 나무는",
    "벼는 익을 수록",
    "하룻강아지",
    "달면 삼키고",
    "어물전 망신은",
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
    "봉창 두드린다",
    "숭늉 찾는다",
    "옷 젖는 줄 모른다",
    "볕 들 날이 있다",
    "지붕 쳐다본다",
    "산으로 간다",
    "떡잎부터 알아본다",
    "고개를 숙인다",
    "범 무서운 줄 모른다",
    "쓰면 뱉는다",
    "꼴뚜기가 시킨다",
  ];
  const [value, setValue] = useState(""); // 음성인식 텍스트 
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      setValue(result);
    },
  });
  let [idx, setIdx] = useState(Math.floor(Math.random() * (proverbFront.length - 1)) + 1); // 문제 index
  let [count, setCount] = useState(0); // 맞춘 갯수 -> 점수
  let [correct, setCorrect] = useState(false);
  // toggle버튼 관리
  const [toggle, setToggle] = useState(false);
  const [passCount, setPassCount] = useState(0); // 패스 갯수

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
        setCount((prevCount) => (prevCount + 1)+(Math.round(Math.random() * 100)));
        setCorrect(false); // 맞춘 후 다시 correct -> false로
      }, 2000);
      // 이전에 등록한 timeout을 clear 하기 위해 return 하여 clear 함수를 등록합니다.
      return () => clearTimeout(timeoutId);
    }
  }, [correct, proverbFront.length]);

  // game 시작전 5초 타이머
  const [gamestart, setGamestart] = useState(false);
  const [time, setTime] = useState(5);
  useEffect(()=>{
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    if(time < 1) setGamestart(true); // 0초가 되면 게임 시작
    return () => clearInterval(timer);
  }, [time])

  // 마이크 버튼
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  function toNext() {
    setPassCount(passCount+1);
    setIdx(Math.floor(Math.random() * (proverbFront.length - 1)) + 1);
  }

  return (
    <>
      <Container>
        {!gamestart ? 
          <>
            <Text style={{zIndex: '500', fontSize: '10rem'}}>{time}</Text>
            <GameBackground />
          </> : 
          <Timer score={count} second={60} />}
        <Text style={{position: 'relative', bottom: '20rem', right: '25rem'}}>score: {count}</Text>
        <Text style={{position: 'relative', bottom: '25rem', left: '20rem'}}>pass 횟수: {passCount}/3</Text>
        <img src="/images/proverb/ufo.png" alt="ufo" style={{marginTop: '-10rem'}}/>
        <Alien />
        <div style={{display: 'flex', gap: '10rem'}}>
          <img src="/images/proverb/rocket.png" alt="rocket"/>
          <img src="/images/proverb/rocket.png" alt="rocket"/>
          <img src="/images/proverb/rocket.png" alt="rocket"/>
        </div>
        <SmallSpeechBubble>
          <CorrectStyle style={correct ? { color: "green" } : { color: "red" }}>
            {correct ? "맞았어!" : "땡"}
          </CorrectStyle>
        </SmallSpeechBubble>
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
          <div style={{display: 'flex', gap: '5rem'}}>
          <RecordButton
            onClick={() => {
              clickedToggle();
              !toggle ? listen({ interimResults: true }) : stop();
            }}
            toggle={toggle}>🎤</RecordButton>
          {/* pass 3번 넘게 하면 없어지게 */}
          {passCount < 3 ? <PassBtn visibility={true} onClick={toNext}>PASS</PassBtn> : <PassBtn visibility={false} onClick={toNext}>PASS</PassBtn>}
        </div>
      </Container>
      <Frame color={"var(--background-main-color)"} />
    </>
  );
}
const GameBackground = styled.div`
  width: 76%;
  height: 73vh;
  top: 18rem;
  position: absolute;
  background: black;
  opacity: 0.5;
  z-index: 300;
`;
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
const CorrectStyle = styled.div`
  font-size: 4rem;
  font-weight: 800;
  color: green;
  margin-top: 8.3rem;
`;
const SmallSpeechBubble = styled(SpeechBubble)`
  object-fit: contain;
  position: absolute;
  bottom: 100rem;
  left: 15rem;
  width: 30rem;
`;
const PassBtn = styled.button`
  font-size: 5rem;
  color: white;
  cursor: pointer;
  background: transparent;
  visibility: ${(props)=> ( props.visibility ? "visible" : "hidden")};
`;
export default GameStartProverb;

