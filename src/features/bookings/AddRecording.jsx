import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useRooms } from "../cabins/useRooms";
import { usePersonnel } from "../personnel/usePersonnel";
import CreateRecordingForm from "./CreateRecordingForm";

function AddRecording() {
  //obtain room data using hooks
  const { rooms, isLoading: isLoadingRoom } = useRooms();

  //obtain personnel data using hooks
  const { personnel, isLoading: isLoadingPersonnel } = usePersonnel();

  return (
    <div>
      <Modal>
        <Modal.Open opens="recording-form">
          <Button>Add new recording</Button>
        </Modal.Open>
        <Modal.Window name="recording-form">
          <CreateRecordingForm rooms={rooms} personnel={personnel} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddRecording;
