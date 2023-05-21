import React, { useState, useEffect } from 'react';
import Frame from "../components/Frame";
import styled from "styled-components";
import { useSpeechRecognition } from "react-speech-kit";

function Snack() {
  const [showOnBoarding, setShowOnBoarding] = useState(true);
  const [randomImage, setRandomImage] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [value, setValue] = useState('');
  const [randomIndex, setRandomIndex] = useState(null);

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });

  const handleListen = () => {
    listen();
  };

  const handleStop = () => {
    stop();
  };

  const handleSend = () => {
    if (transcript.toLowerCase() === imageListName[randomIndex]) {
      getNextProblem();
    }
  };

  const onBoarding = () => (
    <div style={{ width: '50vw', alignContent: 'center' }}>
      <p style={textStyletitle}>
        game
        <br />
        !start!
      </p>
      <p style={textStyle}>과자 이름 맞추기</p>
    </div>
  );

  const imageList = [
    `${process.env.PUBLIC_URL}/images/snackImage/bananakick.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/chocomushroom.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/fish.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/ggoggalcone.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/maga.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/postic.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/squidpeanut.jpeg`,
  ];
  const imageListName = [
    '바나나킥',
    '초코송이',
    '참붕어빵',
    '꼬깔콘',
    '마가렛트',
    '포스틱',
    '오징어땅콩',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOnBoarding(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    const selectedImage = imageList[randomIndex];
    setRandomImage(selectedImage);
    setRandomIndex(randomIndex);
  };

  useEffect(() => {
    getRandomImage();
  }, []);

  useEffect(() => {
    if (transcript && randomIndex !== null && transcript.toLowerCase() === imageListName[randomIndex]) {
      getNextProblem();
    }
  }, [transcript]);

  const getNextProblem = () => {
    getRandomImage();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Container>
        {showOnBoarding && onBoarding()}
        {!showOnBoarding && (
          <div style={{ maxWidth: '60vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {randomImage && <img src={randomImage} alt="Random" style={{ maxWidth: '600px' }} />}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <Button onClick={handleListen} disabled={listening}>
                Listen
              </Button>
              <Button onClick={handleStop} disabled={!listening}>
                Stop
              </Button>
              <input
                type="text"
                value={value}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Enter the recognized text..."
              />
              <Button onClick={handleSend}>Send</Button>
            </div>
          </div>
        )}
      </Container>
      <Frame color="#000" />
    </div>
  );
}

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  margin-left: 10px;
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

const textStyletitle = {
  color: 'blue',
  fontSize: '15vw',
  fontWeight: 'bold',
  textAlign: 'center',
  textShadow: '-10px 0px white, 0px 10px white, 10px 0px white, 0px -10px white',
};

const textStyle = {
  fontSize: '5vw',
  color: 'white',
  textAlign: 'center',
  paddingTop: '30vw'
};

export default Snack;
