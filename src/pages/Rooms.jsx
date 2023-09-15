import RoomTable from "../features/rooms/RoomTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import RoomTableOperation from "../features/rooms/RoomTableOperation";
import AddRoom from "../features/rooms/AddRoom";

function Rooms() {
  return (
    <>
      <Row type="hori">
        <Heading as="h1">All rooms</Heading>
        <RoomTableOperation />
      </Row>
      <Row>
        <RoomTable />
        <AddRoom />
      </Row>
    </>
  );
}

export default Rooms;
