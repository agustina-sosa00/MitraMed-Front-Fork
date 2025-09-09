import React from "react";
import { DetailsMetrics } from "./DetailsMetrics";

//#region arrays

const obs = [
  { name: "Swiss Medical", value: 100, colors: "#D50032" },
  { name: "IOMA", value: 300, colors: "#04AAC0" },
  { name: "Osde", value: 300, colors: "#1226AA" },
  { name: "Medifé", value: 210, colors: "#f37d2e" },
];
const turns = [
  { name: "clínica medica", value: 110, colors: "#1A9AE9" },
  { name: "odontología", value: 310, colors: "#00BF89" },
  { name: "Cardiología", value: 500, colors: "#D50032" },
  { name: "Pediatría", value: 90, colors: "#ECDC2C" },
];

export const Metrics: React.FC = () => {
  return (
    <div className="grid w-full grid-cols-2 gap-5 pt-10 justify-items-center">
      <DetailsMetrics data={obs} title="obras sociales" />
      <DetailsMetrics data={turns} title="turnos por especialidad" />
    </div>
  );
};
