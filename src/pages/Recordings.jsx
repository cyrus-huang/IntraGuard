import Heading from "../ui/Heading";
import Row from "../ui/Row";
import RecordingTable from "../features/bookings/RecordingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import AddRecording from "../features/bookings/AddRecording";

function Recordings() {
  return (
    <>
      <Row type="hori">
        <Heading as="h1">All recordings</Heading>
        <BookingTableOperations />
      </Row>

      <Row>
        <RecordingTable />
        <AddRecording />
      </Row>
    </>
  );
}

export default Recordings;
