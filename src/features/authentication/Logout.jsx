import { FaPowerOff } from "react-icons/fa6";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logOut, isLoading } = useLogout();
  return (
    <ButtonIcon onClick={logOut} disabled={isLoading}>
      {!isLoading ? <FaPowerOff /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
