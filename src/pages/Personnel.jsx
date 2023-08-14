import AddPerson from "../features/personnel/AddPerson";
import PersonnelTable from "../features/personnel/PersonnelTable";
import PersonnelTableOperation from "../features/personnel/PersonnelTableOperation";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Personnel() {
  return (
    <>
      <Row type="hori">
        <Heading as="h1">All personnel</Heading>
        <PersonnelTableOperation />
      </Row>
      <Row>
        <PersonnelTable />
        <AddPerson />
      </Row>
    </>
  );
}

export default Personnel;
