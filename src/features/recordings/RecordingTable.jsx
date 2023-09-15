import RecordingRow from "./RecordingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useRecordings } from "./useRecordings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function RecordingTable() {
  const { recordings, isLoading, count } = useRecordings();

  if (isLoading) return <Spinner />;
  if (!recordings.length) return <Empty resourceName="recordings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Room</div>
          <div>Personnel</div>
          <div>Time</div>
          <div>Status</div>
          <div>Repairing</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={recordings}
          render={(recording) => (
            <RecordingRow key={recording.id} recording={recording} />
          )}
        />

        <Table.Footer>
          <Pagination total={count}></Pagination>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default RecordingTable;
