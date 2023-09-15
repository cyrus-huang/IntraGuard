import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreatePersonForm from "./CreatePersonForm";

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
