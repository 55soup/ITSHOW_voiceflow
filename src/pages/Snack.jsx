import React, { useState, useEffect } from 'react';
import Frame from "../components/Frame";
import styled from "styled-components";
import { useSpeechRecognition } from "react-speech-kit";

function Snack() {
  const [showOnBoarding, setShowOnBoarding] = useState(true);
  const [randomImage, setRandomImage] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [value, setValue] = useState('');

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
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOnBoarding(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const getRandomImage = () => {
      const randomIndex = Math.floor(Math.random() * imageList.length);
      const selectedImage = imageList[randomIndex];
      setRandomImage(selectedImage);
    };

    getRandomImage();
  }, [imageList]);

  useEffect(() => {
    if (transcript) {
      setValue(transcript);
    }
  }, [transcript]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Frame color="#000" />
      <Container>
        {showOnBoarding && onBoarding()}
        {!showOnBoarding && (
          <div style={{ width: '60vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {randomImage && <img src={randomImage} alt="Random" />}
          </div>
        )}
        <SpeechText rotate={"rotate(0deg)"} padding={"5vw"}>
            {value}
        </SpeechText>
        <div>
          <button onClick={handleListen}>Start Listening</button>
          <button onClick={handleStop}>Stop Listening</button>
        </div>
      </Container>
    </div>
  );
}

const Button = styled.button`
  padding: 50vw 30vw;
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

const SpeechText = styled.div`
  padding-top: ${(props) => props.padding};
  font-size: 4.5vw;
  transform: ${(props) => props.rotate};
  color:#ffffff;
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
