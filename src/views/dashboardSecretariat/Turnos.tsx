import { FilterTableSchedules } from "@/components/features/Filters/FilterTableSchedules";
import { dataTableTurns, IDataTable } from "../../mock/arrayTableProfessional";
import React, { useEffect, useState } from "react";
import { TablaMobile } from "@/components/features/PanelProfessional/TablaMobile.tsx";
import { TableProfessionals } from "./TableProfessionals";

export const Turnos: React.FC = () => {
  const getToday = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [daySchedule, setDaySchedule] = useState(getToday);
  const [arrayFilter, setArrayFilter] = useState<IDataTable[]>([]);
  const newArray = [...dataTableTurns];
  useEffect(() => {
    const array = newArray.filter(
      (item) => item.day === daySchedule.split("-").reverse().join("/")
    );

    if (array.length > 0) {
      setArrayFilter(array);
    } else {
      // Genera 5 filas con IDs únicos vacías
      const emptyRows = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1, // o Date.now() + i para que nunca se repita
        day: "",
        hourInit: "",
        hourFinish: "",
        name: "",
        state: "",
        obs: "",
      }));
      setArrayFilter(emptyRows);
    }
  }, [daySchedule]);

  const changeDay = (dias: number) => {
    const nuevaFecha = new Date(daySchedule);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    setDaySchedule(nuevaFecha.toISOString().split("T")[0]);
  };

  return (
    <div className="flex justify-center w-full min-h-screen pt-24 lg:h-screen ">
      <div className=" w-full  xl:w-[70%] h-[60%] flex flex-col justify-center lg:justify-start items-center gap-8  ">
        <div className="flex flex-col w-[80%] ">
          <h1 className="text-2xl font-medium uppercase lg:text-4xl text-green">
            Mis turnos
          </h1>
        </div>
        <FilterTableSchedules
          handle={changeDay}
          state={daySchedule}
          setState={setDaySchedule}
          styles="w-[80%]"
        />

        <div className="flex  justify-between max-h-[200px] px-1 overflow-y-auto lg:overflow-visible w-full  ">
          <TableProfessionals />
          <TablaMobile
            data={arrayFilter}
            columns={[
              { key: "id", label: "ID" },
              { key: "hourInit", label: "Hora Inicio" },
              { key: "hourFinish", label: "Hora Fin" },
              { key: "name", label: "Nombre y Apellido" },
              { key: "state", label: "Estado" },
              { key: "obs", label: "Obra Social" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
