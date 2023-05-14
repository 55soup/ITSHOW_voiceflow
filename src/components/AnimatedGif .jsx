import React, { useEffect, useRef } from 'react';
import Spacemotion from '../image/spacemotion.gif';

const AnimatedGif = () => {
  const gifRef = useRef(null);
  let requestId;

  useEffect(() => {
    const gif = gifRef.current;
    const image = new Image();
    image.src = gif.src;

    const animateGif = () => {
      if (image.complete) {
        gif.src = image.src;
      } else {
        image.onload = () => {
          gif.src = image.src;
        };
      }
      requestId = requestAnimationFrame(animateGif);
    };

    animateGif();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  return <img ref={gifRef} src={Spacemotion} alt="애니메이션 GIF" style={{ width: 909, height: 621, zIndex: -3 }} />;
};

export default AnimatedGif;