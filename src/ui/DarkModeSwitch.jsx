import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";
import { FaMoon, FaSun } from "react-icons/fa6";

function DarkModeSwitch() {
  const { isDark, switchDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={switchDarkMode}>
      {isDark ? <FaSun /> : <FaMoon />}
    </ButtonIcon>
  );
}

export default DarkModeSwitch;
