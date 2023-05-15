import React from "react";
import Frame from "../components/Frame";
import styled from "styled-components";
import TypeWriterEffect from 'react-typewriter-effect';
function Chamcham() {
  return (
    <>
      {/* <Proverb /> */}
      <Frame color={"#000000"} />
      <Videos autoplay="autoplay" muted="muted" loop="loop" controls>
        <source src="images/spacemotion.mp4" />
      </Videos>
			<Box>
          {/* 오류..발생 ... 오류 발..zz 생<br />
          현재 비확인 물체가 뿜어낸 전자파로 <br />
          인해 우주선 운행 프로그램에 오류가 <br />
          발생했다. 대원들은 신속하게 수동으로 <br />
          우주선을 조종해 비확인 물체로부터<br />
          우주선을 보호해라. */}
          <TypeWriterEffect
                  style={{ fontSize: '40px' }}
                  startDelay={100}
                  cursorColor="black"
                  text="오류..발생 ... 오류 발..zz 생
                        현재 비확인 물체가 뿜어낸 전자파로 
                        인해 우주선 운행 프로그램에 오류가 
                        발생했다. 대원들은 신속하게 수동으로 
                        우주선을 조종해 비확인 물체로부터
                        우주선을 보호해라."
                  typeSpeed={100}
                />
      </Box>
    </>
  );
}
const Box = styled.div`
    position: absolute;
    width: 837px;
    height: 373px;
    left: 120px;
    top: 324px;
    background-image: url(images/titletext.png);
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background-size: cover;
    font-size: 40px;
    font-weight: 400;
`;
const Videos = styled.video`
    width: 838px;
    height: 1860px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;
export default Chamcham;
