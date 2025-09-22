import { useEffect, useState } from "react";
// import { generarFilasVacias } from "@/utils/tableUtils";
import { useQuery } from "@tanstack/react-query";
import { obtenerDoctores, obtenerTurnosDiarios } from "../service/turnosGeneralesService";
import { TablaDefault } from "@/frontend-resourses/components";
import { useTurnosGeneralesStore } from "../store/turnosGeneralesStore";

type Doctores = {
  id: number;
  ndoctor: string;
  nespecialidad: string;
};

export default function TablasCard() {
  const [firstLoadDoctores, _setFirstLoadDoctores] = useState(true);

  const {
    doctoresData,
    setDoctoresData,
    doctorSeleccionado,
    setDoctorSeleccionado,
    diaSeleccionado,
    turnosData,
    setTurnosData,
  } = useTurnosGeneralesStore();

  // console.log(doctorSeleccionado?.idd  octor);

  const {
    data: doctoresQuery,
    // refetch: refetchDoctores,
    // isSuccess: isSuccessDoctores,
  } = useQuery<{ data: Doctores[] }>({
    queryKey: ["doctores"],
    queryFn: () => obtenerDoctores(),
    enabled: firstLoadDoctores,
  });

  const doctoresDataTabla = doctoresData
    ? doctoresData.map((item, idx) => ({ ...item, id: idx + 1 }))
    : [];

  const {
    data: doctoresTurnos,
    // isFetching: loadingTurnos,
    // refetch: refetchTurnos,
  } = useQuery({
    queryKey: ["doctoresTurnos", doctorSeleccionado?.iddoctor, diaSeleccionado],
    queryFn: () => {
      if (!doctorSeleccionado?.iddoctor || !diaSeleccionado) return Promise.resolve({ data: [] });
      return obtenerTurnosDiarios({
        fini: diaSeleccionado,
        ffin: diaSeleccionado,
        iddoctor: doctorSeleccionado.iddoctor,
      });
    },
    enabled: Boolean(doctorSeleccionado?.iddoctor && diaSeleccionado),
  });

  const columnasTabla1 = [
    {
      key: "id",
      label: "ID",
      minWidth: "37",
      maxWidth: "37",
    },
    {
      key: "ndoctor",
      label: "Profesional",
      minWidth: "180",
      maxWidth: "180",
    },
    {
      key: "nespecialidad",
      label: "Especialidad",
      minWidth: "170",
      maxWidth: "170",
    },
  ];

  const columnasTabla2 = [
    { key: "id", label: "ID", minWidth: "37", maxWidth: "37" },
    {
      key: "hora_ini",
      label: "Hora Ini",
      minWidth: "80",
      maxWidth: "80",
    },
    {
      key: "hora_fin",
      label: "Hora Fin",
      minWidth: "80",
      maxWidth: "80",
    },
    {
      key: "nestado",
      label: "Estado",
      minWidth: "100",
      maxWidth: "100",
    },
    {
      key: "paciente",
      label: "Paciente",
      minWidth: "240",
      maxWidth: "240",
    },
    {
      key: "obs",
      label: "Obs",
      minWidth: "180",
      maxWidth: "180",
    },
  ];

  // Asegurarse de que cada turno tenga un id único para la tabla y siempre mostrar 12 filas
  const turnosDataTabla = Array.isArray(turnosData)
    ? turnosData.map((item, idx) => ({ id: idx + 1, ...item }))
    : [];

  // Solo mostrar filas de turnos, sin completar con filas vacías
  const datosParaTabla2 = [...turnosDataTabla];

  const propsTabla1 = {
    datosParaTabla: doctoresDataTabla || [],
    selectFn: true,
    objectSelection: {
      setSeleccionado: setDoctorSeleccionado,
    },
    objectColumns: columnasTabla1,
    objectStyles: {
      heightContainer: "300px",
      withScrollbar: true,
      addHeaderColor: "#022539",
      columnasNumber: [1],
      cursorPointer: true,
    },
    selectFirst: true,
    estaProcesado: true,
  };

  const propsTabla2 = {
    datosParaTabla: datosParaTabla2,
    objectColumns: columnasTabla2,
    selectFn: true,
    objectStyles: {
      heightContainer: "300px",
      withScrollbar: true,
      addHeaderColor: "#022539",
      columnasNumber: [1, 2, 3],
      cursorPointer: true,
    },
  };

  useEffect(() => {
    if (doctoresQuery?.data) {
      setDoctoresData(doctoresQuery.data);
    }
  }, [doctoresQuery, setDoctoresData]);

  useEffect(() => {
    if (doctoresTurnos?.data) {
      setTurnosData(doctoresTurnos.data);
    } else {
      setTurnosData([]);
    }
  }, [doctoresTurnos, setTurnosData]);

  return (
    <div className="flex h-full gap-1">
      {/* Tabla 1 */}
      <TablaDefault props={propsTabla1} />

      {/* Tabla 2 */}
      <TablaDefault props={propsTabla2} />
    </div>
  );
}
