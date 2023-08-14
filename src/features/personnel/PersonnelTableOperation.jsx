import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";

function PersonnelTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="available"
        options={[
          { value: "all", label: "All" },
          { value: "not-available", label: "Not available" },
          { value: "available", label: "Available" },
        ]}
      />

      <Sort
        options={[
          { value: "name-asc", label: "Sort by name(A-Z)" },
          { value: "name-desc", label: "Sort by name(Z-A)" },
        ]}
      />
    </TableOperations>
  );
}

export default PersonnelTableOperation;
