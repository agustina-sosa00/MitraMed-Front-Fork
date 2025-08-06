import { FilterTableSchedules } from "@/components/features/Filters/FilterTableSchedules";
import {
  IDataTable,
  tableColumnData,
  tableSchedules,
} from "../../mock/arrayTableProfessional";
import React, { useEffect, useState } from "react";
import { TablaDefault } from "../../frontend-resourses/components";
import { ContainView } from "@/components/features/PanelProfessional/ContainView";

export const TableSchedules: React.FC = () => {
  // const []
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

    if (array.length > 0) {
      setArrayFilter(array);
    } else {
      const emptyRows = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
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
    <ContainView title="mis turnos">
      <FilterTableSchedules
        handle={changeDay}
        state={daySchedule}
        setState={setDaySchedule}
      />

      <div className="flex justify-center max-h-[200px]   overflow-y-auto lg:overflow-visible w-full px-5 ">
        <TablaDefault
          props={{
            datosParaTabla: arrayFilter,
            objectColumns: tableColumnData,
            objectStyles: {
              withScrollbar: true,
              addHeaderColor: "#022539",
              containerClass: "border border-gray-300 rounded-t-lg ",
              withBorder: false,
            },
          }}
        />
      </div>
    </ContainView>
  );
};
