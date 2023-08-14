import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTableOperation from "../features/cabins/CabinTableOperation";
import AddRoom from "../features/cabins/AddRoom";

function Cabins() {
  return (
    <>
      <Row type="hori">
        <Heading as="h1">All rooms</Heading>
        <CabinTableOperation />
      </Row>
      <Row>
        <CabinTable />
        <AddRoom />
      </Row>
    </>
  );
}

export default Cabins;
