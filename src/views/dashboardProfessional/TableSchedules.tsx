import { FilterTableSchedules } from "@/components/features/Filters/FilterTableSchedules";
import TablaDefault from "../../frontend-resourses/components/Tables/TablaDefault/TablaDefault.tsx";
import {
  IDataTable,
  tableColumnData,
  tableSchedules,
} from "../../mock/arrayTableProfessional";
import React, { useEffect, useState } from "react";

export const TableSchedules: React.FC = () => {
  const getToday = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [daySchedule, setDaySchedule] = useState(getToday);
  const [arrayFilter, setArrayFilter] = useState<IDataTable[]>([]);
  const newArray = [...tableSchedules];
  useEffect(() => {
    const array = newArray.filter(
      (item) => item.day === daySchedule.split("-").reverse().join("/")
    );
    setArrayFilter(array);
  }, [daySchedule]);

  return (
    <div className="flex items-start justify-center w-full h-screen py-10">
      <div className="w-[80%] flex justify-center flex-col items-center gap-5">
        <h1 className="text-4xl font-medium uppercase text-green">
          {" "}
          Mis turnos
        </h1>
        <FilterTableSchedules state={daySchedule} setState={setDaySchedule} />
        <div className="text-xl text-blue">
          <TablaDefault
            props={{
              datosParaTabla: arrayFilter,
              objectColumns: tableColumnData,
              objectStyles: {
                addHeaderColor: " #022539",
                columnasNumber: [1],
                addRowColor: "#f1f1f1",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
