import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecordings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useRecordings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //sort
  const sortMethod = searchParams.get("sort") || "start_time-desc";
  const [way, order] = sortMethod.split("-");
  const sort = { way, order };
  // console.log(sort);

  //pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //query
  const {
    isLoading,
    data: { data: recordings, count } = {},
    error,
  } = useQuery({
    queryKey: ["recordings", filter, sort, page],
    queryFn: () => getRecordings({ filter, sort, page }),
  });

  //prefetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["recordings", filter, sort, page + 1],
      queryFn: () => getRecordings({ filter, sort, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["recordings", filter, sort, page - 1],
      queryFn: () => getRecordings({ filter, sort, page: page - 1 }),
    });

  return {
    isLoading,
    recordings,
    error,
    count,
  };
}
