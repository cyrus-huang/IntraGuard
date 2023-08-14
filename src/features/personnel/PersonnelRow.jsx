import styled from "styled-components";
import { FaCopy, FaPen, FaTrash } from "react-icons/fa6";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { deletePersonnel } from "../../services/apiPersonnel";
import CreatePersonForm from "./CreatePersonForm";
import { useDeletePerson } from "./useDeletePerson";
import { useCreatePerson } from "./useCreatePerson";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

// const Price = styled.div`
//   font-family: "Sono";
//   font-weight: 600;
// `;

// const Discount = styled.div`
//   font-family: "Sono";
//   font-weight: 500;
//   color: var(--color-green-700);
// `;

function PersonnelRow({ person }) {
  const { id: person_id, name, pid, phone, photo, available } = person;

  const { isDeleting, deletePerson } = useDeletePerson();
  const { createPerson, isCreating } = useCreatePerson();

  function handleDuplicate() {
    createPerson({
      name: `Copy of ${name}`,
      pid,
      phone,
      photo,
      available,
    });
  }
  return (
    <>
      <Table.Row>
        <Img src={photo} />
        <Cabin>{name}</Cabin>
        <div>{pid}</div>
        <div>{phone}</div>
        <div>{available ? "Available now" : "Not available"}</div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={person_id} />

              <Menus.List id={person_id}>
                <Menus.Button
                  icon={<FaCopy />}
                  onClick={handleDuplicate}
                  disabled={isCreating}
                >
                  Copy
                </Menus.Button>

                <Modal.Open opens="edit">
                  <Menus.Button icon={<FaPen />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<FaTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreatePersonForm personToEdit={person} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="personnel"
                  disabled={isDeleting}
                  onConfirm={() => deletePerson(person_id)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default PersonnelRow;
