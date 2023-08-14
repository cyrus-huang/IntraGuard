import { useState } from "react";
import Button from "../../ui/Button";
import CreateRoomForm from "./CreateRoomForm";
import Modal from "../../ui/Modal";

// function AddCabin() {
//   const [showForm, setShowForm] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setShowForm((show) => !show)}>
//         Add new cabin
//       </Button>
//       {showForm && (
//         <Modal onClose={() => setShowForm(false)}>
//           <CreateRoomForm onClose={() => setShowForm(false)}></CreateRoomForm>
//         </Modal>
//       )}
//     </div>
//   );
// }
function AddRoom() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="room-form">
          <Button>Add new computer room</Button>
        </Modal.Open>
        <Modal.Window name="room-form">
          <CreateRoomForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddRoom;
