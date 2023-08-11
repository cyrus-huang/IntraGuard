import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  FaCalendarCheck,
  FaChartSimple,
  FaMoneyBill,
  FaPersonWalkingLuggage,
} from "react-icons/fa6";

function Statistics({ bookings, confirmedStays, numDays, cabinLen }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.total_price, 0);
  const checkins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.num_nights, 0) /
    (numDays * cabinLen);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<FaPersonWalkingLuggage />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<FaMoneyBill />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<FaCalendarCheck />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<FaChartSimple />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Statistics;
