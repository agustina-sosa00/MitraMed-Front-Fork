import { TablaMobile } from "@/components/features/PanelProfessional/TablaMobile";
import { tableProfessionals } from "../../mock/arrayTableProfessional";
import React from "react";

export const TableProfessionals: React.FC = () => {
  return (
    <div className="flex-[1] h-full ">
      <TablaMobile
        data={tableProfessionals}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Nombre y Apellido" },
          { key: "especiality", label: "Especialidad" },
        ]}
      />
    </div>
  );
};
