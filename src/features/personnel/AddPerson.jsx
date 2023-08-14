import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreatePersonForm from "./CreatePersonForm";

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
function AddPerson() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="person-form">
          <Button>Add new personnel room</Button>
        </Modal.Open>
        <Modal.Window name="person-form">
          <CreatePersonForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddPerson;
