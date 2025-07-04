import { TablaMobile } from "@/components/features/PanelProfessional/TablaMobile";
import { tableProfessionals } from "../../mock/arrayTableProfessional";
import React from "react";
interface IProp {
  onSelect?: (item: number) => void;
  tableID?: string;
}

export const TableProfessionals: React.FC<IProp> = ({ onSelect, tableID }) => {
  return (
    <div className="flex-[1] h-full ">
      <TablaMobile
        tableId={tableID}
        onSelect={onSelect}
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
