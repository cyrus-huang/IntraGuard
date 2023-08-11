import { styled } from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const HeaderStyle = styled.header`
  background-color: var(--color-grey-0);
  padding: 2rem 4rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2.4rem;
`;

function Header() {
  return (
    <HeaderStyle>
      <UserAvatar />
      <HeaderMenu />
    </HeaderStyle>
  );
}

export default Header;
