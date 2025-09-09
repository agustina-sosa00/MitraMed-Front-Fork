import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FilterTableSchedules } from "@/components/features/Filters/FilterTableSchedules";
import { ContainView } from "@/components/features/PanelProfessional/ContainView";
import { obtenerTurnosDiarios } from "@/services/TurnosProfService";
import { IDataTable, tableSchedules } from "../../mock/arrayTableProfessional";
import { TablaDefault } from "../../frontend-resourses/components";

export default function TurnosProfView() {
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

  const datosParaTabla = Array.isArray(turnosProfesional?.data)
    ? turnosProfesional.data.map((item, idx) => ({
        id: idx + 1,
        hora_ini: item.hora_ini,
        hora_fin: item.hora_fin,
        estado: item.estado,
        paciente: `${item.apellido} ${item.nombre}`.trim(),
        obs: item.obs || "",
        mit: item.idusuario === null ? "Mit" : "Web",
      }))
    : [];

  const propsTabla = {
    datosParaTabla,
    objectColumns: columns,
    objectStyles: {
      heightContainer: "350px",
      withScrollbar: true,
      addHeaderColor: "#022539",
    },
  };

  useEffect(() => {
    if (turnosProfesional && Array.isArray(turnosProfesional) && turnosProfesional.length > 0) {
      setArrayFilter(turnosProfesional);
    } else {
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
    }
  }, [turnosProfesional, daySchedule]);

  function getToday(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function changeDay(dias: number) {
    const nuevaFecha = new Date(daySchedule);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    setDaySchedule(nuevaFecha.toISOString().split("T")[0]);
  }

  return (
    <ContainView title="mis turnos" padding="py-5 px-10">
      <FilterTableSchedules handle={changeDay} state={daySchedule} setState={setDaySchedule} />

      <div className="flex justify-center overflow-y-auto lg:overflow-visible w-full px-5 ">
        <TablaDefault props={propsTabla} />
      </div>
    </ContainView>
  );
}
