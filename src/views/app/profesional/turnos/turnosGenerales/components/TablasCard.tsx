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
      maxWidth: "300",
    },
    {
      key: "nespecialidad",
      label: "Especialidad",
      minWidth: "170",
      maxWidth: "300",
    },
  ];

  const columnasTabla2 = [
    { key: "id", label: "ID", minWidth: "20", maxWidth: "20" },
    {
      key: "hora_ini",
      label: "Hora Ini",
      minWidth: "70",
      maxWidth: "70",
    },
    {
      key: "hora_fin",
      label: "Hora Fin",
      minWidth: "72",
      maxWidth: "72",
    },
    {
      key: "nestado",
      label: "Estado",
      minWidth: "120",
      maxWidth: "200",
    },
    {
      key: "paciente",
      label: "Paciente",
      minWidth: "250",
      maxWidth: "400",
    },
    {
      key: "obs",
      label: "Obs",
      minWidth: "190",
      maxWidth: "400",
    },
  ];

  // Si no hay turnos, mostrar una fila única con mensaje personalizado
  const turnosDataTabla =
    Array.isArray(turnosData) && turnosData.length > 0
      ? turnosData.map((item, idx) => ({ id: idx + 1, ...item }))
      : [
          {
            id: 0,
            hora_ini: "",
            hora_fin: "",
            nestado: "",
            paciente: "No hay Turnos en la Fecha Seleccionada.",
            obs: "",
          },
        ];

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
      heightContainer: "450px",
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
      heightContainer: "450px",
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
