import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  FaHouseChimney,
  FaRegCalendarCheck,
  FaBuildingColumns,
  FaChalkboardUser,
  FaIdCardClip,
} from "react-icons/fa6";

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
`;

const NavLi = styled.li`
  display: flex;
  flex-direction: row;
`;

const Link = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 3.6rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <NavLi>
          <Link to="/dashboard">
            <FaHouseChimney />
            <span>Home</span>
          </Link>

          <Link to="/recordings">
            <FaRegCalendarCheck />
            <span>Recordings</span>
          </Link>

          <Link to="/rooms">
            <FaBuildingColumns />
            <span>Rooms</span>
          </Link>

          <Link to="/personnel">
            <FaIdCardClip />
            <span>Personnel</span>
          </Link>

          <Link to="/users">
            <FaChalkboardUser />
            <span>Users</span>
          </Link>
        </NavLi>
      </NavList>
    </nav>
  );
}

export default MainNav;
