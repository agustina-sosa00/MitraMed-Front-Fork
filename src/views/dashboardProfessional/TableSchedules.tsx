import { FilterTableSchedules } from "@/components/features/Filters/FilterTableSchedules";
import TablaDefault from "../../frontend-resourses/components/Tables/TablaDefault/TablaDefault.tsx";
import {
  IDataTable,
  tableColumnData,
  tableSchedules,
} from "../../mock/arrayTableProfessional";
import React, { useEffect, useState } from "react";
import { TablaMobile } from "@/components/features/PanelProfessional/TablaMobile.tsx";

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
    <div className="flex justify-center w-full min-h-screen pt-24 lg:h-screen ">
      <div className=" w-full lg:w-[80%] h-[60%] flex flex-col justify-center lg:justify-start items-center gap-8  ">
        <h1 className="text-2xl font-medium text-center uppercase lg:text-4xl text-green">
          Mis turnos
        </h1>
        <FilterTableSchedules state={daySchedule} setState={setDaySchedule} />
        <div className="hidden text-xl lg:block text-blue">
          <TablaDefault
            props={{
              datosParaTabla: arrayFilter,
              objectColumns: tableColumnData,
              objectStyles: {
                addHeaderColor: " #022539",
                columnasNumber: [1],
                addRowColor: "#f1f1f1",
                heightContainer: "200px",
              },
            }}
          />
        </div>
        <div className="block w-full px-5 lg:hidden">
          <TablaMobile data={arrayFilter} />
        </div>
      </div>
    </div>
  );
};
