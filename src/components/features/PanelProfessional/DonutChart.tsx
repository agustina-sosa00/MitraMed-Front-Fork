import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  PieLabelRenderProps,
  Tooltip,
} from "recharts";

interface IProp {
  data: {
    name: string;
    value: number;
    colors: string;
  }[];
}

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  const RADIAN = Math.PI / 180;

  // ✅ Ajustamos el radio para posicionar labels fuera del gráfico
  const offset = 20; // distancia fuera del borde
  const radius = (outerRadius ? Number(outerRadius) : 0) + offset;

  const x = (Number(cx) || 0) + radius * Math.cos(-midAngle * RADIAN);
  const y = (Number(cy) || 0) + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#022539"
      textAnchor={x > (cx || 0) ? "start" : "end"} // Ajuste dinámico
      dominantBaseline="central"
      fontSize="14"
      fontWeight="bold"
    >
      {`${Math.round((percent || 0) * 100)}%`}
    </text>
  );
};

const DonutChartWithLabels: React.FC<IProp> = ({ data }) => {
  return (
    <div className="w-full h-full overflow-visible ">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="0%" // ✅ donut
            outerRadius="70%" // ✅ espacio suficiente para labels
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
};

export default DonutChartWithLabels;
