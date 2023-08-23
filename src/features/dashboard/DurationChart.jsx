import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    type: "air_condition",
    value: 0,
    color: "#ef4444",
  },
  {
    type: "electricity",
    value: 0,
    color: "#f97316",
  },
  {
    type: "fire_control",
    value: 0,
    color: "#eab308",
  },
  {
    type: "environment",
    value: 0,
    color: "#84cc16",
  },
  {
    type: "security",
    value: 0,
    color: "#22c55e",
  },
  {
    type: "wiring",
    value: 0,
    color: "#14b8a6",
  },
  {
    type: "ups",
    value: 0,
    color: "#3b82f6",
  },
  {
    type: "running",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    type: "air_condition",
    value: 0,
    color: "#b91c1c",
  },
  {
    type: "electricity",
    value: 0,
    color: "#c2410c",
  },
  {
    type: "fire_control",
    value: 0,
    color: "#a16207",
  },
  {
    type: "environment",
    value: 0,
    color: "#4d7c0f",
  },
  {
    type: "security",
    value: 0,
    color: "#15803d",
  },
  {
    type: "wiring",
    value: 0,
    color: "#0f766e",
  },
  {
    type: "ups",
    value: 0,
    color: "#1d4ed8",
  },
  {
    type: "running",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, recordings) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.type === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = recordings
    .reduce((arr, cur) => {
      const type = cur.repairing;
      if (type === "air_condition") return incArrayValue(arr, "air_condition");
      if (type === "electricity") return incArrayValue(arr, "electricity");
      if (type === "fire_control") return incArrayValue(arr, "fire_control");
      if (type === "environment") return incArrayValue(arr, "environment");
      if (type === "security") return incArrayValue(arr, "security");
      if (type === "wiring") return incArrayValue(arr, "wiring");
      if (type === "ups") return incArrayValue(arr, "ups");
      if (type === "running") return incArrayValue(arr, "running");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ recordings }) {
  const { isDark } = useDarkMode();
  const startData = isDark ? startDataDark : startDataLight;
  const data = prepareData(startData, recordings);

  return (
    <ChartBox>
      <Heading as="h3">Repairing History</Heading>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            nameKey="type"
            dataKey="value"
            innerRadius={70}
            outerRadius={100}
            cx="45%"
            cy="50%"
            paddingAngle={2}
          >
            {data.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.type} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
