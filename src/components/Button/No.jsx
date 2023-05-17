import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function No() {
  const navigate = useNavigate();
  const [isMousedown, SetMousedown] = useState(false);
  const onclick = () => {
    navigate("/chamcham");
  };
  const mousedown = () => {
    SetMousedown(!isMousedown);
  };
  return (
    <Container
      onClick={onclick}
      onMouseDown={mousedown}
      className={`${isMousedown ? `button--mousedown` : ""} `}
    />
  );
}

const Container = styled.div`
  width: 30rem;
  height: 25rem;
  background-image: url("images/buttons.png");
  background-position: -75rem -3rem;
  background-size: 500%;
  &.button--mousedown {
    background-position: -110rem -3rem;
  }
`;
export default No;
