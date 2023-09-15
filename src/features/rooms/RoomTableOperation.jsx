import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";

function RoomTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="ptype"
        options={[
          { value: "all", label: "All" },
          { value: "not-running", label: "Not running" },
          { value: "need-repair", label: "Need repair" },
        ]}
      />

      <Sort
        options={[
          { value: "name-asc", label: "Sort by name(A-Z)" },
          { value: "name-desc", label: "Sort by name(Z-A)" },
          { value: "priority-asc", label: "Sort by priority(low to high)" },
          { value: "priority-desc", label: "Sort by priority(high to low)" },
        ]}
      />
    </TableOperations>
  );
}

export default RoomTableOperation;
