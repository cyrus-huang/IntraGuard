import { styled } from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import Logo from "./Logo";
import MainNav from "./MainNav";

const HeaderStyle = styled.header`
  background-color: var(--color-grey-0);
  padding: 2rem 4rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;
`;
const HeaderSetting = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const HeaderNav = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

function Header() {
  return (
    <HeaderStyle>
      <HeaderNav>
        <Logo />
        <MainNav />
      </HeaderNav>
      <HeaderSetting>
        <UserAvatar />
        <HeaderMenu />
      </HeaderSetting>
    </HeaderStyle>
  );
}

export default Header;
