import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";

interface IProp {
  data: {
    name: string;
    value: number;
  }[];
}

const colors = ["#3b82f6", "#06b6d4", "#ec4899", "#db2777"]; // Azul, Cyan, Rosa

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  //   innerRadius,
  outerRadius,
  name,
}: PieLabelRenderProps) => {
  const RADIAN = Math.PI / 180;
  //   const r = ((Number(innerRadius) || 0) + (Number(outerRadius) || 0)) / 2;
  //   const x = (Number(cx) || 0) + r * Math.cos(-midAngle * RADIAN);
  //   const y = (Number(cy) || 0) + r * Math.sin(-midAngle * RADIAN);
  const radius = Number(outerRadius) + 40; // 20px fuera del borde
  const x = (Number(cx) || 0) + radius * Math.cos(-midAngle * RADIAN);
  const y = (Number(cy) || 0) + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#000"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="14"
      fontWeight="bold"
      className="break-words whitespace-normal"
    >
      {name}
    </text>
  );
};

const handleOnClick = (data) => {
  console.log(data);
};

const DonutChartWithLabels: React.FC<IProp> = ({ data }) => {
  return (
    <div className="" style={{ width: "400px", height: "400px" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="0%"
            outerRadius="50%" //achicar para que los labels tengan mas espacio
            dataKey="value"
            label={renderCustomLabel}
            labelLine={true}
            onClick={(data) => handleOnClick(data)}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChartWithLabels;
