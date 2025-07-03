import { TablaMobile } from "@/components/features/PanelProfessional/TablaMobile";
import { tableSchedules } from "../../mock/arrayTableProfessional";
import React from "react";

export const TableProfessionals: React.FC = () => {
  return (
    <div className="flex-[1] h-full bg-orange-500">
      <TablaMobile
        data={tableSchedules}
        columns={[
          { key: "id", label: "ID" },
          { key: "day", label: "Día" },
          { key: "hourInit", label: "Hora Inicio" },
          { key: "hourFinish", label: "Hora Fin" },
          { key: "name", label: "Nombre y Apellido" },
          { key: "state", label: "Estado" },
          { key: "obs", label: "Obra Social" },
        ]}
      />
    </div>
  );
};
