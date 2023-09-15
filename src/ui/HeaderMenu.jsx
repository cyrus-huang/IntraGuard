import { styled } from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DarkModeSwitch from "./DarkModeSwitch";

const HeaderMenuStyle = styled.ul`
  display: flex;
  gap: 0.4rem;
  padding: 1.2rem 2.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <HeaderMenuStyle>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <FaUserCircle />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeSwitch />
      </li>
      <li>
        <Logout />
      </li>
    </HeaderMenuStyle>
  );
}

export default HeaderMenu;
