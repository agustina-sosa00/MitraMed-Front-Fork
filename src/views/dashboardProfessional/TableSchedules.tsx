import { FilterTableSchedules } from "@/components/features/Filters/FilterTableSchedules";
import { TablaDefault } from "../../frontend-resourses/components";
import {
  tableColumnData,
  tableSchedules,
} from "../../mock/arrayTableProfessional";
import React from "react";

export const TableSchedules: React.FC = () => {
  return (
    <div className="flex items-start justify-center w-full h-screen py-10">
      <div className="w-[80%] flex justify-center flex-col items-center gap-5">
        <h1 className="text-4xl font-medium uppercase text-green">
          {" "}
          Mis turnos
        </h1>
        <FilterTableSchedules />
        <div className="text-xl text-blue">
          <TablaDefault
            props={{
              datosParaTabla: tableSchedules,
              objectColumns: tableColumnData,
              objectStyles: {
                addHeaderColor: " #022539",
                columnasNumber: [1],
                addRowColor: "#dddada",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
