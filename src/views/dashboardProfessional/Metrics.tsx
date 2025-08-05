import DonutChartWithLabels from "@/components/features/PanelProfessional/DonutChart";
import React from "react";

//#region Tooltip
const metodoDePago = [
  { name: "mp", value: 400 },
  { name: "ef", value: 300 },
  { name: "cred", value: 200 },
  { name: "deb", value: 100 },
];
const obs = [
  { name: "Swiss Medical", value: 100 },
  { name: "IOMA", value: 300 },
  { name: "S.S", value: 200 },
];

export const Metrics: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div>
        <DonutChartWithLabels data={metodoDePago} />{" "}
      </div>

      <DonutChartWithLabels data={obs} />
    </div>
  );
};
