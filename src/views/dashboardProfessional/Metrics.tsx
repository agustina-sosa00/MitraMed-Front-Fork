import { ContainView } from "@/components/features/PanelProfessional/ContainView";
import React from "react";
import { DetailsMetrics } from "./DetailsMetrics";

//#region arrays
const metodoDePago = [
  { name: "efectivo", value: 400, colors: "#00911F" },
  { name: "mercado pago", value: 300, colors: "#00B5F6" },
  { name: "débito", value: 100, colors: "#0050BF" },
  { name: "crédito", value: 200, colors: "#EB9C09" },
];
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
    <ContainView title="métricas generales">
      <div className="grid w-full grid-cols-2 gap-5 justify-items-center">
        <DetailsMetrics data={metodoDePago} title="método de pago" />
        <DetailsMetrics data={obs} title="obras sociales" />
        <DetailsMetrics data={turns} title="turnos por especialidad" />
      </div>
    </ContainView>
  );
};
