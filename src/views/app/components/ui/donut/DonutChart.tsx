import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { SmallTooltip, renderCustomLabel } from "./donutUtils";

interface IProp {
  data: {
    name: string;
    value: number;
    colors: string;
  }[];
}

export default function DonutChart({ data }: IProp) {
  return (
    <div className="w-full h-full overflow-visible">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="0%"
            outerRadius="70%"
            dataKey="value"
            label={renderCustomLabel}
            labelLine={true}
            isAnimationActive={false}
          >
            {data.map((item, index) => (
              <Cell key={index} fill={item.colors} />
            ))}
          </Pie>
          <Tooltip content={<SmallTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
