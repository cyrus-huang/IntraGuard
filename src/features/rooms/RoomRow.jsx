import styled from "styled-components";
import CreateRoomForm from "./CreateRoomForm";
import { useDeleteRoom } from "./useDeleteRoom";
import { FaCopy, FaPen, FaTrash } from "react-icons/fa6";
import { useCreateRoom } from "./useCreateRoom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

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

const Room = styled.div`
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

function RoomRow({ room }) {
  const {
    id: room_id,
    name,
    air_condition,
    electricity,
    fire_control,
    environment,
    security,
    wiring,
    ups,
    running,
    overall,
    image,
    priority,
  } = room;

  const { isDeleting, deleteRoom } = useDeleteRoom();
  const { isCreating, createRoom } = useCreateRoom();

  function handleDuplicate() {
    createRoom({
      name: `Copy of ${name}`,
      air_condition,
      electricity,
      fire_control,
      environment,
      security,
      wiring,
      ups,
      running,
      overall,
      image,
      priority,
    });
  }
  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Room>{name}</Room>
        <div>{running ? "Computers Running" : "Not Running"}</div>
        <div>{overall ? "Facilities operating" : "Needs repairing"}</div>
        <div>{priority}</div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={room_id} />

              <Menus.List id={room_id}>
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
                <CreateRoomForm roomToEdit={room} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="rooms"
                  disabled={isDeleting}
                  onConfirm={() => deleteRoom(room_id)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default RoomRow;
