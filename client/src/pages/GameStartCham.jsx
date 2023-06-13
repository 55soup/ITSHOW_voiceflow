import React, { useState, useEffect, useRef } from "react";
import Frame from "../components/Frame";
import styled from "styled-components";
import * as faceapi from 'face-api.js';
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
  top: "1184px"
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
    "미확인 물체 발견 !! 3초 안에 대원은 왼쪽과 오른쪽 중에 이동할 방향을 선택해 움직여라"
  );
  // 3초 타이머
  const [timeLeft, setTimeLeft] = useState(3); //수정
  const [timerStarted, setTimerStarted] = useState(false);
  //6초 감소 시킬 timeRef
  const timeRef = useRef(Date.now());
  const hartcount = useState(3);
    // 컴퓨터 선택 방향 상태
    const [computerDirection, setComputerDirection] = useState("");
  
    // // 1초가 되면 정지되도록 코드 수정(3->2->1->0초에서 타이머 멈춤)
    // useEffect(() => {
    //   const timeout = setTimeout(() => {
    //     const interval = setInterval(() => {
    //       setTimeLeft((prevTime) => {
    //         if (prevTime === 1) {
    //           clearInterval(interval); // 1초가 되면 인터벌 정지
    //         }
    //         return prevTime - 1;
    //       });
    //     }, 1000);
        
    //     return () => {
    //       clearInterval(interval);
    //     };
    //   }, 7000); // 3초 후에 인터벌 시작
    
    //   return () => {
    //     clearTimeout(timeout);
    //   };
    // }, []);
  // 타임에 맞추어 타이머 돌리기 
  useEffect(() => {
    if (timerStarted) {
      const timeoutId = setTimeout(() => {
        const intervalId = setInterval(() => {
          setTimeLeft((prevTimeLeft) => {
            const newTimeLeft = Math.max(0, prevTimeLeft - 0.3);
            if (newTimeLeft === 0) {
              clearInterval(intervalId);
            }
            return newTimeLeft;
          });
        }, 100);
    
        return () => clearInterval(intervalId);
      }, 3500);
  
      return () => clearTimeout(timeoutId);
    }
  }, [timerStarted]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (hartcount > 0) {
        setTimeLeft(3);
        timeRef.current = Date.now();
      }
    }, 3500);
  
    return () => clearTimeout(timer);
  }, []); // 두 번째 useEffect에서 timeLeft를 의존성으로 사용하지 않음  

  // useRef 훅을 사용하여 typingTextRef라는 변수 생성
  const typingTextRef = useRef(null);

  const handleTextChange = (text) => {
    // 텍스트를 변경하는 함수
    setText('ㅇ');
    // typingTextRef의 resetTyping 함수 호출
    // // typingTextRef의 resetTyping 함수 호출
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
          console.log('오른쪽');
          return "right";
        } else if (faceDirection === 'right') {
          console.log('왼쪽');
          return "left"
        }
        //0.1초마다 인터벌 실행
      }, 3000);
    }
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
  const getRandomDirection = () => {
    const directions = ["left", "right"];
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
  };


  return (
    <div>
      <Container>
        <Heart />
        <Heart style={{ left: 244 }} />
        <Heart style={{ left: 320 }} />
        <Box>
          <TypingText text={text} ref={typingTextRef} />
        </Box>
        <div style={{ position: 'relative', left: -24}}>
			    <video style={CameraStyle} ref={videoRef} onLoadedMetadata={detectFace} autoPlay muted />
			    <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: 838, transform: "scaleX(-1)", marginLeft: "52px"}}/>
		    </div>
        <Time>{Math.round(timeLeft)}</Time>
        <video style={videoStyle} autoPlay muted loop>
          <source src="images/spacemotion.mp4" />
        </video>
      </Container>
      <Frame color={"#000000"} />
    </div>
  );
}

// 타이핑 효과 
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

export default Chamcham;
