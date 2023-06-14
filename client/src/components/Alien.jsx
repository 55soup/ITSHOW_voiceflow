import styled,{keyframes} from "styled-components";

const Alien = (props) => {
  return (
    <>
      <Container />
    </>
  );
};

const rotation = keyframes`
//단계 별로 변화를 주는 코드
0%{
    transform: rotate(310deg);
  }
  50%{
    transform: rotate(360deg);
  }
  100%{
    transform: rotate(310deg);
  }
`;

const Container = styled.div`
  width: 10rem;
  height: 10rem;
  background: url('/images/proverb/alien.png') center/contain no-repeat;
  transform: rotate(310deg);
  position: relative;
  right: 18rem;
  top: 16rem;
  z-index: -1;
  transition: all 0.3s ease-out;
  animation: ${rotation} 1s linear infinite;`;

  export default Alien;