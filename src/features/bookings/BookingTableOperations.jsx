import Sort from "../../ui/Sort";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "completed", label: "Completed" },
          { value: "in-progress", label: "In Progress" },
          { value: "scheduled", label: "Scheduled" },
        ]}
      />

      <Sort
        options={[
          { value: "start_time-desc", label: "Sort by date (recent first)" },
          { value: "start_time-asc", label: "Sort by date (recent last)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
