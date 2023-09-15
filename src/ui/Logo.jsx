import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  padding-right: 4.6rem;
`;

const Img = styled.img`
  height: 6rem;
  width: auto;
`;

function Logo() {
  const { isDark } = useDarkMode();
  const src = isDark ? "/logo-dark.png" : "/logo-light.png";
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
