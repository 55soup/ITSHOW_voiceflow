import styled from "styled-components";

const Frame = (props) => {
  return (
    <>
      <Container />
      <Background color={props.color} />
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  /* background-image: url(process.env.PUBLIC_URL+"frame.png") */
  background: url("images/frame.png") center / cover no-repeat;
  position: absolute;
  z-index: 1;
`;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.color};
  z-index: -5;
  position: absolute;
`;

export default Frame;
