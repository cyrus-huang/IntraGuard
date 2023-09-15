import Spinner from "../../ui/Spinner";
import RoomRow from "./RoomRow";
import { useRooms } from "./useRooms";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function RoomTable() {
  const { isLoading, rooms } = useRooms();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!rooms.length) return <Empty resourceName="rooms" />;

  //filter
  const filterValue = searchParams.get("ptype") || "all";
  let filterRooms;
  if (filterValue === "all") filterRooms = rooms;
  if (filterValue === "not-running")
    filterRooms = rooms.filter((room) => room.running === false);
  if (filterValue === "need-repair")
    filterRooms = rooms.filter((room) => room.overall === false);

  //sort
  const sort = searchParams.get("sort") || "name-asc";
  const [way, order] = sort.split("-");
  const symbol = order === "asc" ? 1 : -1;
  const sortedRooms = filterRooms.sort((a, b) => (a[way] - b[way]) * symbol);

  return (
    <Menus>
      <Table columns="0.6fr 1.6fr 1.6fr 2.2fr 1fr 0.6fr">
        <Table.Header>
          <div></div>
          <div>Room</div>
          <div>Running</div>
          <div>Overall Safety</div>
          <div>Priority</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedRooms}
          render={(room) => <RoomRow room={room} key={room.id} />}
        />
      </Table>
    </Menus>
  );
}

export default RoomTable;
