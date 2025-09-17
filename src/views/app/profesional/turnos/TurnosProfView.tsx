import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IDataTable, tableSchedules } from "./mock/arrayTableProfessional";
import { TablaDefault } from "../../../../frontend-resourses/components";
import { ContainView } from "../../components/features/ContainView";
import FiltrosTablaMisTurnos from "../../components/ui/Filters/FiltrosTablaMisTurnos";
import { obtenerTurnosDiarios } from "./services/TurnosProfService";

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
      maxWidth: "120",
    },
    // HORA_FIN
    {
      key: "hora_fin",
      label: "Hora Fin",
      minWidth: "75",
      maxWidth: "120",
    },
    // ESTADO
    {
      key: "estado",
      label: "Estado",
      minWidth: "120",
      maxWidth: "200",
    },
    // PACIENTE
    {
      key: "paciente",
      label: "Paciente",
      minWidth: "250",
      maxWidth: "420",
    },
    // OBS
    {
      key: "obs",
      label: "Obs",
      minWidth: "250",
      maxWidth: "420",
    },
    // VACIO
    {
      key: "mit",
      label: "Mit",
      minWidth: "70",
      maxWidth: "90",
    },
  ];

  const sinDatos = [
    {
      id: "",
      hora_ini: "",
      hora_fin: "",
      estado: "",
      paciente: "No hay Datos en la Fecha Seleccionada",
      obs: "",
      mit: "",
    },
  ];

  const datosParaTabla =
    Array.isArray(turnosProfesional?.data) && turnosProfesional.data.length > 0
      ? turnosProfesional.data.map((item, idx) => ({
          id: idx + 1,
          hora_ini: item.hora_ini,
          hora_fin: item.hora_fin,
          estado: item.nestado,
          paciente: item.npaciente,
          obs: item.obs || "",
          mit: item.idusuario === null ? "Mit" : "Web",
        }))
      : sinDatos;

  const propsTabla = {
    datosParaTabla,
    objectColumns: columns,
    objectStyles: {
      widthContainer: "900px",
      heightContainer: "440px",
      withScrollbar: true,
      addHeaderColor: "#022539",
      viewport1440: {
        widthContainer1440px: "1100px",
        heightContainer1440px: "500px",
      },
      viewport1536: {
        widthContainer1536px: "1200px",
        heightContainer1536px: "590px",
      },
      viewport1920: {
        widthContainer1920px: "1400px",
        heightContainer1920px: "600px",
      },
    },
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

  function changeDay(dias: number) {
    const nuevaFecha = new Date(daySchedule);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    setDaySchedule(nuevaFecha.toISOString().split("T")[0]);
  }

  return (
    <ContainView title="mis turnos" padding="py-5 px-10">
      <FiltrosTablaMisTurnos handle={changeDay} state={daySchedule} setState={setDaySchedule} />

      <div className="flex justify-center w-full px-5 overflow-y-auto lg:overflow-visible ">
        <TablaDefault props={propsTabla} />
      </div>
    </ContainView>
  );
}
