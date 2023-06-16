import React, { useState, useEffect, useRef } from "react";
import Frame from "../components/Frame";
import styled from "styled-components";
import * as faceapi from 'face-api.js';
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";

// 비디오 스타일을 정의한 객체
const videoStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  marginLeft: "117px",
	marginTop: "-128px",
  position: "absolute",
  width: "838px",
  height: "621px",
  left: "4px",
  top: "1169px"
};
// 비디오 스타일을 정의한 객체
const CameraStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  width: "838px",
  transform: "scaleX(-1)", // 좌우 반전을 적용하는 부분
  marginLeft: "52px",
};
function Chamcham() {
  // 초기 텍스트 상태를 설정하는 useState 훅
  const [text, setText] = useState(
    `미확인 물체 발견 !! \n3초 안에 대원은 왼쪽과 오른쪽 중에 \n이동할 방향을 선택해 움직여라`
  );
  // 3초 타이머
  const [timeLeft, setTimeLeft] = useState(3); //수정
  //6초 감소 시킬 timeRef
  const timeRef = useRef(Date.now());
  const [hartcount, setHeartCount] = useState(3);
  // 컴퓨터 선택 방향 상태
  const [computerDirection, setComputerDirection] = useState("");
  const [userDirection, setUserDirection] = useState("");
  const [score, setScore] = useState(0)
  const [timerStart, setTimerStart] = useState(false)
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log(timerStart)
  }, [timerStart])

  // 컴포넌트가 처음 렌더링될 때 얼굴 방향을 감지하고 `userDirection` 상태를 설정합니다.
  useEffect(() => {
    let intervalId;
    if(timerStart) {
      let timeLeft = 3;
        intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 1 && hartcount > 0) {
            const randomDirection = getRandomDirection();
            if (userDirection === randomDirection) {
              console.log("같음", userDirection, randomDirection);
              setScore((data) => data + 10)
            } else {
              console.log("다름", userDirection, randomDirection);
              setHeartCount((heartcount) => heartcount - 1); // 틀릴 때마다 heartCount 감소
              if (hartcount > 0) {
                timeLeft = 3;
              } else {
                clearInterval(intervalId);
                console.log("dssd");
              }
            }
          }
          return prevTimeLeft === 1 ? 3 : prevTimeLeft - 1;
        });
      }, 1000);
    }
    
    return () => {
      clearInterval(intervalId);
    };
  }, [timerStart, userDirection]);  
  
  // useRef 훅을 사용하여 typingTextRef라는 변수 생성
  const typingTextRef = useRef(null);

  const handleTextChange = (text) => {
    // 텍스트를 변경하는 함수
    setText('ㅇ');
    typingTextRef.current.resetTyping();
  };
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let previousNoseX = 0;

  //face.api.js 모듈 사용 
  useEffect(() => {
    // 필요한 모델을 로드하는 Promise.all을 사용합니다.
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"), // 작은 얼굴 탐지 모델 로드
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"), // 68개의 얼굴 랜드마크 모델 로드
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"), // 얼굴 인식 모델 로드
        faceapi.nets.faceExpressionNet.loadFromUri("/models"), // 표정 인식 모델 로드
    ]).then(startVideo);
  }, []);

  // 비디오 스트림을 가져와서 비디오 요소에 연결
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFaceDirection = (detections) => {
    if (!detections || detections.length === 0) {
      return 'unknown';
    }

    const landmarks = detections[0].landmarks;
    const noseX = landmarks.getNose()[0].x;

    const movementDistance = Math.abs(noseX - previousNoseX);

    let faceDirection = 'unknown';
    const movementThreshold = 5;
    if (movementDistance > movementThreshold) {
      if (noseX < previousNoseX) {
        faceDirection = 'left';
      } else if (noseX > previousNoseX) {
        faceDirection = 'right';
      }

      previousNoseX = noseX;
    }
    return faceDirection;
  };

  //얼구을 감지하는 함수 
  const detectFace = async () => {
    // 비디오 요소와 캔버스 요소가 존재하는 경우 실행 
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // 비디오 및 캔버스 크기 설정 
      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      // 캔버스 크기를 비디오 크기에 맞게 조정 
      faceapi.matchDimensions(canvas, displaySize);

      // 일정 간격으로 실행되는 인터벌 함수 
      setInterval(async () => {
        // 비디오에서 얼굴을 감지하고 얼굴 랜드마크 및 표정을 분석 
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();
        
        // 감지 결과를 비디오 크기에 맞게 조정 
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        //캔버스 지우고 초기화 
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        //그리기 옵션 
        const drawOptions = {
          drawLines: true,
          drawPoints: true,
          lineWidth: 2,
          lineColor: 'rgba(255, 0, 0, 0.5)',
          pointColor: 'rgba(0, 255, 0, 0.5)',
        };
        //얼굴 랜드마크 캔버스에 그림 
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections, drawOptions);
        //얼굴 방향을 가져옴 
        const faceDirection = getFaceDirection(resizedDetections);
        // 얼굴 방향에 따라 콘솔창에 출력
        if (faceDirection === 'left') {
          setUserDirection("right")
          return "right";
        } else if (faceDirection === 'right') {
          setUserDirection("left")
          return "left"
        }
        //0.1초마다 인터벌 실행
      }, 100);
    }
  };

  if(hartcount == -1) {
    alert(`Time OVER! 당신의 점수는? ${score}`);
    localStorage.setItem("score", score);
    localStorage.setItem("game", "cham");
    navigate("/infoinput");
  }

  const getRandomDirection = () => {
    const directions = ["left", "right"];
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
  };


  return (
    <div>
      <Container>
        <div style={{position: 'absolute',top: '194px',fontSize: '20px', left: 493}}>
        <Timer count={30}/>
        </div>
      {hartcount >= 1 && <Heart />}
      {hartcount >= 2 && <Heart style={{ left: 244 }} />}
      {hartcount >= 3 && <Heart style={{ left: 320 }} />}
        <Box>
        {hartcount > 0 &&
          <TypingText text={text} ref={typingTextRef} onTypingComplete={() => setTimerStart(true)} />
        } 
        {hartcount <= 0 &&
          <div style={{fontSize: 40}}>우하하하 여기는 우리가 접수하겠다. </div>
        } 
        </Box>
        {hartcount <= 0 &&
        // <Box2>  
        //   대원, 덕분에 무사히 <br/>
        //   우주선을 보호할 수 있었어요 ! <br />
        //   대원의 점수는 {} 입니다.
        // </Box2>
        <div>
          <Alien></Alien>
          <Alien style={{top: 800, left: 150, width: 305, height: 305}}></Alien>
          <Alien style={{top: 747, left: 716, width: 213, height: 213}}></Alien>
        </div>
        }
        {hartcount > 0 &&
          <div style={{ position: 'relative', left: -24}}>
            <video style={CameraStyle} ref={videoRef} onLoadedMetadata={detectFace} autoPlay muted />
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: 838, transform: "scaleX(-1)", marginLeft: "52px"}}/>
          </div>
      }
      {hartcount > 0 &&
        <Time>{Math.round(timeLeft)}</Time>
      }
        <video style={videoStyle} autoPlay muted loop>
          <source src="images/spacemotion.mp4" />
        </video>
      </Container>
      <Frame color={"#000000"} />
    </div>
  );
}

// 타이핑 효과 
const TypingText = React.forwardRef(({ text, onTypingComplete }, ref ) => {
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
      onTypingComplete();
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
const Alien = styled.div`
  background-image: url(images/alien.png);
  background-size: cover;
  position: absolute;
  width: 452px;
  height: 388px;
  left: 300px;
  top: 482px;
`
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
font-size: 160px;
line-height: 140px;
left: 450px;
`
const Box2 = styled.div`
position: absolute;
width: 728px;
height: 538px;
left: 158px;
top: 340px;
background-color: white;
color: black;
display: flex;
justify-content: center;
align-items: center;
margin: 0 auto;
font-size: 40px;
font-weight: 400;
z-index: 999;
padding: 20px;
`

export default Chamcham;
