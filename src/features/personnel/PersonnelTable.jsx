import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { usePersonnel } from "./usePersonnel";
import PersonnelRow from "./PersonnelRow";

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

function PersonnelTable() {
  const { isLoading, personnel, error } = usePersonnel();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!personnel.length) return <Empty resourceName="available" />;

  //filter
  const filterValue = searchParams.get("available") || "all";
  let filterPersonnel;
  if (filterValue === "all") filterPersonnel = personnel;
  if (filterValue === "not-available")
    filterPersonnel = personnel.filter((person) => person.available === false);
  if (filterValue === "available")
    filterPersonnel = personnel.filter((person) => person.available === true);

  //sort
  const sort = searchParams.get("sort") || "name-asc";
  const [way, order] = sort.split("-");
  const symbol = order === "asc" ? 1 : -1;

  const sortedPersonnel = filterPersonnel.sort(
    (a, b) => (a[way].charCodeAt(0) - b[way].charCodeAt(0)) * symbol
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.6fr 2.2fr 1.6fr 1fr 0.6fr">
        <Table.Header>
          <div></div>
          <div>Personnel</div>
          <div>ID</div>
          <div>Phone</div>
          <div>Availablity</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedPersonnel}
          render={(person) => <PersonnelRow person={person} key={person.id} />}
        />
      </Table>
    </Menus>
  );
}

export default PersonnelTable;
