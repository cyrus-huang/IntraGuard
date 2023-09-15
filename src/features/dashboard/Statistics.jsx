import { FaTools } from "react-icons/fa";
import Stat from "./Stat";
import { FaChartSimple, FaCheckToSlot } from "react-icons/fa6";

function Statistics({ recordings }) {
  const numRecordings = recordings.length;
  const solutions = recordings.filter((rec) => rec.fixed === true).length;
  const occupation = numRecordings === 0 ? 0 : solutions / numRecordings;

  return (
    <>
      <Stat
        title="Services"
        color="indigo"
        icon={<FaTools />}
        value={numRecordings}
      />
      <Stat
        title="Solutions"
        color="green"
        icon={<FaCheckToSlot />}
        value={solutions}
      />
      <Stat
        title="Fixed rate"
        color="yellow"
        icon={<FaChartSimple />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Statistics;
