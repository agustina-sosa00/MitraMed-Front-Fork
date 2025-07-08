import { tableProfessionals } from "../../mock/arrayTableProfessional";
import React, { useState } from "react";
import { TablaDefault } from "@/frontend-resourses/components";
interface IProp {
  onSelect?: (item: number) => void;
  tableID?: string;
}

export const TableProfessionals: React.FC<IProp> = ({ onSelect, tableID }) => {
  const [select, setSelect] = useState();
  console.log("desde tabla profesional estado local", select);
  return (
    <div className="flex-[1] h-full ">
      {/* <TablaMobile
        tableId={tableID}
        onSelect={onSelect}
        data={tableProfessionals}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Nombre y Apellido" },
          { key: "especiality", label: "Especialidad" },
        ]}
      /> */}
      <TablaDefault
        props={{
          selectFn: true,
          objectSelection: {
            setSeleccionado: setSelect,
          },
          datosParaTabla: tableProfessionals,
          objectColumns: [
            {
              key: "id",
              label: "ID",
              minWidth: "40",
              maxWidth: "40",
            },
            {
              key: "name",
              label: "Nombre y Apellido",
              minWidth: "180",
              maxWidth: "180",
            },
            {
              key: "especiality",
              label: "Especialidad",
              minWidth: "170",
              maxWidth: "170",
            },
          ],

          objectStyles: {
            withScrollbar: true,
            addHeaderColor: "#022539",
            columnasNumber: [1],
            cursorPointer: true,
          },
        }}
      />
    </div>
  );
};
