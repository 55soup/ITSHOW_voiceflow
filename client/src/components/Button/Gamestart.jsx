import styled from "styled-components";
import { useState, useEffect } from "react";

function Gamestart(props) {
  const [isMousedown, SetMousedown] = useState(false);
  const mousedown = () => {
    SetMousedown(true);
  };
  const mouseup = () => {
    SetMousedown(false);
  };
  return (
    <Container
      onClick={props.onClick}
      onMouseDown={mousedown}
      onMouseUp={mouseup}
      className={`${isMousedown ? `button--mousedown` : ""}`}
    />
  );
}

const Container = styled.div`
  width: 30rem;
  height: 25rem;
  background-image: url("images/buttons.png");
  background-position: -6rem 30rem;
  background-size: 500%;
  &.button--mousedown {
    background-position: -42rem 30rem;
  }
`;
export default Gamestart;
