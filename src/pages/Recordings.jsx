import Heading from "../ui/Heading";
import Row from "../ui/Row";
import RecordingTable from "../features/recordings/RecordingTable";
import RecordingTableOperations from "../features/recordings/RecordingTableOperations";
import AddRecording from "../features/recordings/AddRecording";

function Recordings() {
  return (
    <>
      <Row type="hori">
        <Heading as="h1">All recordings</Heading>
        <RecordingTableOperations />
      </Row>

      <Row>
        <RecordingTable />
        <AddRecording />
      </Row>
    </>
  );
}

export default Recordings;
