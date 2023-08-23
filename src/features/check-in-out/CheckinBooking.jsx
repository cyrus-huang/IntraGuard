import styled from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useRecording } from "../bookings/useRecording";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/UseSettings";
import RecordingDataBox from "../bookings/RecordingDataBox";
import { useCheckout } from "./useCheckout";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { isLoading, recording } = useRecording();
  const [confirmFixed, setConfirmFixed] = useState(false);
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();
  const { checkout, isCheckingOut } = useCheckout();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  // const { editRoom, isEditing } = useEditCabin();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: recordingId,
    created_at,
    start_time,
    end_time,
    status,
    item,
    comments,
    repairing,
    fixed,
    personnel: { name: person_name, pid, phone, photo },
    rooms: { name: room_name, id: room_id },
  } = recording;

  function handleRegister() {
    //check in
    if (status === "scheduled") checkin({ recordingId });
    //check out
    if (status === "in-progress") {
      checkout({ recordingId, confirmFixed });
      // editRoom({ {...rooms, ${repairing} : true } ,id: room_id });
    }
  }

  return (
    <>
      <Row type="hori">
        <Heading as="h1">
          {status === "scheduled"
            ? `Check in Repairing Record #${recordingId}`
            : status === "in-progress"
            ? `Check out Repairing Record #${recordingId}`
            : `Session Ended: Repairing Record #${recordingId}`}
        </Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <RecordingDataBox recording={recording} />

      {status === "in-progress" && (
        <Box>
          <Checkbox
            checked={confirmFixed}
            onChange={() => setConfirmFixed((confirm) => !confirm)}
            id="confirm"
            disabled={isCheckingIn}
          >
            Problem {repairing} has been fixed.
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        {status === "scheduled" && (
          <Button onClick={handleRegister} disabled={isCheckingIn}>
            Check in Record #{recordingId}
          </Button>
        )}
        {status === "in-progress" && (
          <Button onClick={handleRegister} disabled={isCheckingOut}>
            Check out Record #{recordingId}
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
