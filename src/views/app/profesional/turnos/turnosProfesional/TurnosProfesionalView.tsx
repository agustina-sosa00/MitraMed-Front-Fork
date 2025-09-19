import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IDataTable, tableSchedules } from "./mock/arrayTableProfessional";
import { TablaDefault } from "../../../../../frontend-resourses/components";
import { ContainView } from "../../../_components/features/ContainView";
// import FiltrosTablaMisTurnos from "../turnosProfesionales/components/SearchCard";
import { obtenerTurnosDiarios } from "./services/turnosProfesionalService";
import SearchCard from "../_components/SearchCard";
import { generarFilasVacias } from "@/utils/tableUtils";

interface TurnoTablaRow {
  id: string;
  hora_ini: string;
  hora_fin: string;
  estado: string;
  paciente: string;
  obs: string;
  mit: string;
}

export default function TurnosProfesionalView() {
  const [daySchedule, setDaySchedule] = useState(getToday);
  const [_arrayFilter, setArrayFilter] = useState<IDataTable[]>([]);
  const newArray = [...tableSchedules];

  const { data: turnosProfesional } = useQuery({
    queryKey: ["turnos-profesional", daySchedule],
    queryFn: () => obtenerTurnosDiarios({ fini: daySchedule, ffin: daySchedule }),
    enabled: !!daySchedule,
  });

  const columns = [
    // ID
    {
      key: "id",
      label: "ID",
      minWidth: "40",
      maxWidth: "40",
    },
    // HORA_INI
    {
      key: "hora_ini",
      label: "Hora Ini",
      minWidth: "75",
      maxWidth: "75",
    },
    // HORA_FIN
    {
      key: "hora_fin",
      label: "Hora Fin",
      minWidth: "75",
      maxWidth: "75",
    },
    // ESTADO
    {
      key: "estado",
      label: "Estado",
      minWidth: "160",
      maxWidth: "160",
    },
    // PACIENTE
    {
      key: "paciente",
      label: "Paciente",
      minWidth: "300",
      maxWidth: "300",
    },
    // OBS
    {
      key: "obs",
      label: "Obs",
      minWidth: "370",
      maxWidth: "370",
    },
    // VACIO
    {
      key: "mit",
      label: "Mit",
      minWidth: "70",
      maxWidth: "70",
    },
  ];

  let datosParaTabla: TurnoTablaRow[] = [];
  if (Array.isArray(turnosProfesional?.data) && turnosProfesional.data.length > 0) {
    datosParaTabla = turnosProfesional.data.map((item, idx) => ({
      id: (idx + 1).toString(),
      hora_ini: item.hora_ini,
      hora_fin: item.hora_fin,
      estado: item.nestado,
      paciente: item.npaciente,
      obs: item.obs || "",
      mit: item.idusuario === null ? "Mit" : "Web",
    }));
    if (datosParaTabla.length < 12) {
      datosParaTabla = [
        ...datosParaTabla,
        ...generarFilasVacias(12 - datosParaTabla.length, columns, datosParaTabla.length + 1),
      ];
    }
  } else {
    datosParaTabla = generarFilasVacias(12, columns);
  }

  const propsTabla = {
    datosParaTabla,
    objectColumns: columns,
    objectStyles: {
      heightContainer: "327px",
      withScrollbar: true,
      addHeaderColor: "#022539",
    },
    selectFn: true,
  };

  useEffect(() => {
    if (turnosProfesional && Array.isArray(turnosProfesional) && turnosProfesional.length > 0) {
      setArrayFilter(turnosProfesional);
    } else {
      const array = newArray.filter(
        (item) => item.day === daySchedule.split("-").reverse().join("/"),
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
    }
  }, [turnosProfesional, daySchedule]);

  function getToday(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <ContainView title="mis turnos" padding="py-5 px-10">
      <div className="flex w-full ">
        <SearchCard diaSeleccionado={daySchedule} setDiaSeleccionado={setDaySchedule} />
      </div>

      <div className="flex justify-center w-full px-5 overflow-y-auto lg:overflow-visible ">
        <TablaDefault props={propsTabla} />
      </div>
    </ContainView>
  );
}
