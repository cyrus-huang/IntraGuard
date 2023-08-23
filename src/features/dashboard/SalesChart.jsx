import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const fakeData = [
  { label: "Jan 09", totalIssues: 480, fixedIssues: 20 },
  { label: "Jan 10", totalIssues: 580, fixedIssues: 100 },
  { label: "Jan 11", totalIssues: 550, fixedIssues: 150 },
  { label: "Jan 12", totalIssues: 600, fixedIssues: 50 },
  { label: "Jan 13", totalIssues: 700, fixedIssues: 150 },
  { label: "Jan 14", totalIssues: 800, fixedIssues: 150 },
  { label: "Jan 15", totalIssues: 700, fixedIssues: 200 },
  { label: "Jan 16", totalIssues: 650, fixedIssues: 200 },
  { label: "Jan 17", totalIssues: 600, fixedIssues: 300 },
  { label: "Jan 18", totalIssues: 550, fixedIssues: 100 },
  { label: "Jan 19", totalIssues: 700, fixedIssues: 100 },
  { label: "Jan 20", totalIssues: 800, fixedIssues: 200 },
  { label: "Jan 21", totalIssues: 700, fixedIssues: 100 },
  { label: "Jan 22", totalIssues: 810, fixedIssues: 50 },
  { label: "Jan 23", totalIssues: 950, fixedIssues: 250 },
  { label: "Jan 24", totalIssues: 970, fixedIssues: 100 },
  { label: "Jan 25", totalIssues: 900, fixedIssues: 200 },
  { label: "Jan 26", totalIssues: 950, fixedIssues: 300 },
  { label: "Jan 27", totalIssues: 850, fixedIssues: 200 },
  { label: "Jan 28", totalIssues: 900, fixedIssues: 100 },
  { label: "Jan 29", totalIssues: 800, fixedIssues: 300 },
  { label: "Jan 30", totalIssues: 950, fixedIssues: 200 },
  { label: "Jan 31", totalIssues: 1100, fixedIssues: 300 },
  { label: "Feb 01", totalIssues: 1200, fixedIssues: 400 },
  { label: "Feb 02", totalIssues: 1250, fixedIssues: 300 },
  { label: "Feb 03", totalIssues: 1400, fixedIssues: 450 },
  { label: "Feb 04", totalIssues: 1500, fixedIssues: 500 },
  { label: "Feb 05", totalIssues: 1400, fixedIssues: 600 },
  { label: "Feb 06", totalIssues: 1450, fixedIssues: 400 },
];

function SalesChart({ recordings, numDays }) {
  const { isDark } = useDarkMode();
  const allDate = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDate.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalIssues: recordings
        .filter((recording) => isSameDay(date, new Date(recording.start_time)))
        .reduce((acc, cur) => acc + (cur ? 1 : 0), 0),
      fixedIssues: recordings
        .filter((recording) => isSameDay(date, new Date(recording.start_time)))
        .reduce((acc, cur) => acc + (cur.fixed ? 1 : 0), 0),
    };
  });
  console.log(data);

  const colors = isDark
    ? {
        totalIssues: { stroke: "#4f46e5", fill: "#4f46e5" },
        fixedIssues: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalIssues: { stroke: "#4f46e5", fill: "#c7d2fe" },
        fixedIssues: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h3">
        Issues from {format(allDate.at(0), "MMM dd yyy")} to{" "}
        {format(allDate.at(-1), "MMM dd yyy")}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="2" />
          <Tooltip contentStyle={{ background: colors.background }} />
          <Area
            dataKey="totalIssues"
            type="monotone"
            stroke={colors.totalIssues.stroke}
            fill={colors.totalIssues.fill}
            strokeWidth={3}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="fixedIssues"
            type="monotone"
            stroke={colors.fixedIssues.stroke}
            fill={colors.fixedIssues.fill}
            strokeWidth={3}
            name="Extra sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
