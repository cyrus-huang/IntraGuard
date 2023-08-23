import styled from "styled-components";
import { useRecentRecordings } from "./useRecentRecordings";
import Spinner from "../../ui/Spinner";
import Statistics from "./Statistics";
import { useRooms } from "../cabins/useRooms";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import { useSearchParams } from "react-router-dom";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
const StyledDataLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto -1rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {
    recordings,
    isLoading: isLoadingBookings,
    numDays,
  } = useRecentRecordings();

  if (isLoadingBookings) return <Spinner />;

  return (
    <>
      <StyledDataLayout>
        <Statistics recordings={recordings} />
      </StyledDataLayout>
      <StyledDashboardLayout>
        <TodayActivity />
        <DurationChart recordings={recordings} />
        <SalesChart recordings={recordings} numDays={numDays} />
      </StyledDashboardLayout>
    </>
  );
}

export default DashboardLayout;
