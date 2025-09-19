import { PieLabelRenderProps } from "recharts";

export function SmallTooltip({ active, payload }: { active?: boolean; payload?: any[] }) {
  if (active && payload && payload.length) {
    const { name, value } = payload[0] || {};
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: 4,
          padding: "2px 8px",
          fontSize: 12,
          minWidth: 0,
        }}
      >
        <span style={{ color: "#022539", fontWeight: 500 }}>{name}: </span>
        <span style={{ color: "#518915", fontWeight: 700 }}>{value}</span>
      </div>
    );
  }
  return null;
}

export function renderCustomLabel({ cx, cy, midAngle, outerRadius, percent }: PieLabelRenderProps) {
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
}
