import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ recordingId }) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => navigate(`/register/${recordingId}`)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
