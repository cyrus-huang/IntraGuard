import styled from "styled-components";
import { format, isToday } from "date-fns";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import {
  FaEye,
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
  FaTrash,
  FaPen,
  FaCopy,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteRecording } from "./useDeleteRecording";
import CreateRecordingForm from "./CreateRecordingForm";
import { useRooms } from "../cabins/useRooms";
import { usePersonnel } from "../personnel/usePersonnel";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function RecordingRow({ recording }) {
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
    personnel: { name: person_name, phone },
    rooms: { name: room_name },
  } = recording;
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteRecording, isDeleting } = useDeleteRecording();
  const statusToTagName = {
    scheduled: "blue",
    "in-progress": "green",
    completed: "silver",
  };

  //obtain room data using hooks
  const { rooms, isLoading: isLoadingRoom } = useRooms();

  //obtain personnel data using hooks
  const { personnel, isLoading: isLoadingPersonnel } = usePersonnel();

  // const { isCreating, createRecording } = useCreateRecording();

  return (
    <Table.Row>
      <Cabin>{room_name}</Cabin>

      <Stacked>
        <span>{person_name}</span>
        <span>{phone}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(start_time))
            ? "Today"
            : formatDistanceFromNow(start_time)}{" "}
          {/* &rarr; {num_nights} night stay */}
        </span>
        <span>
          {format(new Date(start_time), "HH:mm MMM dd yyyy")} &mdash;{" "}
          {format(new Date(end_time), "HH:mm MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Stacked>
        <span>{repairing}</span>
        <span>{fixed ? "fixed" : "not fixed"}</span>
      </Stacked>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={recordingId} />
          <Menus.List id={recordingId}>
            <Menus.Button
              icon={<FaEye />}
              onClick={() => navigate(`/recordings/${recordingId}`)}
            >
              See Details
            </Menus.Button>

            {status === "scheduled" && (
              <Menus.Button
                icon={<FaArrowRightToBracket />}
                onClick={() => navigate(`/register/${recordingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === "in-progress" && (
              <Menus.Button
                icon={<FaArrowRightFromBracket />}
                onClick={() => navigate(`/register/${recordingId}`)}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="edit">
              <Menus.Button icon={<FaPen />}>Edit</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<FaTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="edit">
          <CreateRecordingForm
            recordingToEdit={recording}
            rooms={rooms}
            personnel={personnel}
          />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => deleteRecording(recordingId)}
          ></ConfirmDelete>
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default RecordingRow;
