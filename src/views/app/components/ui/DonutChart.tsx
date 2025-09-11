import { PieChart, Pie, Cell, ResponsiveContainer, PieLabelRenderProps } from "recharts";

interface IProp {
  data: {
    name: string;
    value: number;
    colors: string;
  }[];
}

const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent }: PieLabelRenderProps) => {
  const RADIAN = Math.PI / 180;

  const offset = 20; // distancia fuera del borde
  const radius = (outerRadius ? Number(outerRadius) : 0) + offset;

  const x = (Number(cx) || 0) + radius * Math.cos(-midAngle * RADIAN);
  const y = (Number(cy) || 0) + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#022539"
      textAnchor={Number(x) > Number(cx || 0) ? "start" : "end"}
      dominantBaseline="central"
      fontSize="14"
      fontWeight="bold"
    >
      {`${Math.round((percent || 0) * 100)}%`}
    </text>
  );
};

export default function DonutChart({ data }: IProp) {
  return (
    <div className="w-full h-full overflow-visible ">
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
