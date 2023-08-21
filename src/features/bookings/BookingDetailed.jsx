import styled from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteRecording } from "./useDeleteRecording";
import Empty from "../../ui/Empty";
import { useRecording } from "./useRecording";
import RecordingDataBox from "./RecordingDataBox";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetailed() {
  const { isLoading, recording } = useRecording();
  const { deleteRecording, isDeleting } = useDeleteRecording();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!recording) return <Empty resourceName="recording" />;

  const { status, fixed, id: recordingId } = recording;

  const statusToTagName = {
    scheduled: "blue",
    "in-progress": "green",
    completed: "silver",
  };

  return (
    <>
      <Row type="hori">
        <HeadingGroup>
          <Heading as="h1">
            Recording #{recordingId} ({fixed ? "fixed" : "not fixed"})
          </Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <RecordingDataBox recording={recording} />

      <ButtonGroup>
        {status === "scheduled" && (
          <Button onClick={() => navigate(`/register/${recordingId}`)}>
            Check in
          </Button>
        )}

        {status === "in-progress" && (
          <Button onClick={() => navigate(`/register/${recordingId}`)}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="recording"
              disabled={isDeleting}
              onConfirm={() =>
                deleteRecording(recordingId, { onSettled: () => navigate(-1) })
              }
            ></ConfirmDelete>
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetailed;
