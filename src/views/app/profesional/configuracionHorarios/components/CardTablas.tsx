import { useCallback, useEffect, useMemo } from "react";
import { TablaDefault } from "@/frontend-resourses/components";
import { useQuery } from "@tanstack/react-query";
import { obtenerDoctores } from "../../turnos/turnosGenerales/service/turnosGeneralesService";
import { useConfiguracionHorariosStore } from "../store/ConfiguracionHorariosStore";

type DayId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export default function CardTablas() {
  // -------- store ----------
  const doctoresData = useConfiguracionHorariosStore((s) => s.doctoresData);
  const setDoctoresData = useConfiguracionHorariosStore((s) => s.setDoctoresData);

  const seleccionado = useConfiguracionHorariosStore((s) => s.seleccionado);
  const seleccionarDoctor = useConfiguracionHorariosStore((s) => s.seleccionarDoctor);
  const seleccionarDia = useConfiguracionHorariosStore((s) => s.seleccionarDia);

  const horarios = useConfiguracionHorariosStore((s) => s.horarios);
  const horarioSeleccionadoId = useConfiguracionHorariosStore((s) => s.horarioSeleccionadoId);
  const setHorarioSeleccionadoId = useConfiguracionHorariosStore((s) => s.setHorarioSeleccionadoId);

  // -------- fetch doctores (carga una sola vez) ----------
  const { data } = useQuery({ queryKey: ["doctores"], queryFn: obtenerDoctores });
  useEffect(() => {
    const rows = Array.isArray(data) ? data : (data as any)?.data;
    if (!doctoresData.length && Array.isArray(rows) && rows.length) {
      setDoctoresData(rows);
    }
  }, [data, doctoresData.length, setDoctoresData]);

  // -------- handlers ----------
  const onSelectDoctor = useCallback(
    (rowOrId: any) => {
      const id = typeof rowOrId === "number" ? rowOrId : (rowOrId?.iddoctor ?? rowOrId?.id);
      if (id != null && id !== seleccionado.doctorId) seleccionarDoctor(id);
    },
    [seleccionado.doctorId, seleccionarDoctor],
  );

  const onSelectDia = useCallback(
    (rowOrId: any) => {
      const id = (typeof rowOrId === "number" ? rowOrId : rowOrId?.id) as DayId | undefined;
      if (id != null && id !== seleccionado.dia) seleccionarDia(id);
    },
    [seleccionado.dia, seleccionarDia],
  );

  const onSelectHorario = useCallback(
    (rowOrId: any) => {
      // en la tabla 3 mapeamos _id => id real del horario
      const id = typeof rowOrId === "string" ? rowOrId : (rowOrId?._id ?? rowOrId?.id);
      if (id && id !== horarioSeleccionadoId) setHorarioSeleccionadoId(id);
    },
    [horarioSeleccionadoId, setHorarioSeleccionadoId],
  );

  // -------- datos memorizados ----------
  const doctoresDataTabla = useMemo(
    () => doctoresData.map((d, i) => ({ ...d, id: i + 1 })),
    [doctoresData],
  );

  const dias = useMemo(
    () => [
      { id: 1, dia: "Lunes" },
      { id: 2, dia: "Martes" },
      { id: 3, dia: "Miércoles" },
      { id: 4, dia: "Jueves" },
      { id: 5, dia: "Viernes" },
      { id: 6, dia: "Sábado" },
      { id: 7, dia: "Domingo" },
    ],
    [],
  );

  const horariosSel = useMemo(() => {
    const { doctorId, dia } = seleccionado;
    if (!doctorId || !dia) return [];
    return horarios.filter((h) => h.doctorId === doctorId && h.dia === dia);
  }, [horarios, seleccionado]);

  const horariosTabla = useMemo(
    () =>
      horariosSel.map((h, i) => ({
        id: i + 1, // nro de fila para mostrar
        hora_ini: h.hora_ini,
        hora_fin: h.hora_fin,
        _id: h.id, // id real para editar/eliminar
      })),
    [horariosSel],
  );

  // -------- props tablas ----------
  const propsProfesionales = useMemo(
    () => ({
      datosParaTabla: doctoresDataTabla,
      selectFn: true,
      objectSelection: { setSeleccionado: onSelectDoctor },
      objectColumns: [
        { key: "id", label: "Id", minWidth: "48", maxWidth: "64" },
        { key: "ndoctor", label: "Profesional", minWidth: "220", maxWidth: "260" },
        { key: "nespecialidad", label: "Especialidad", minWidth: "220", maxWidth: "260" },
      ],
      objectStyles: {
        heightContainer: "400px",
        widthContainer: "520px",
        addHeaderColor: "#022539",
        columnasNumber: [1],
      },
    }),
    [doctoresDataTabla, onSelectDoctor],
  );

  const propsDias = useMemo(
    () => ({
      datosParaTabla: dias,
      selectFn: true,
      objectSelection: { setSeleccionado: onSelectDia },
      objectColumns: [{ key: "dia", label: "Día", minWidth: "120", maxWidth: "160" }],
      objectStyles: {
        heightContainer: "240px",
        widthContainer: "140px",
        addHeaderColor: "#022539",
      },
    }),
    [dias, onSelectDia],
  );

  const propsHorarios = useMemo(
    () => ({
      datosParaTabla: horariosTabla,
      selectFn: true,
      objectSelection: { setSeleccionado: onSelectHorario },
      objectColumns: [
        { key: "id", label: "ID", minWidth: "48", maxWidth: "64" },
        { key: "hora_ini", label: "Hora Ini", minWidth: "120", maxWidth: "160" },
        { key: "hora_fin", label: "Hora Fin", minWidth: "120", maxWidth: "160" },
      ],
      objectStyles: {
        heightContainer: "400px",
        widthContainer: "380px",
        addHeaderColor: "#022539",
        columnasNumber: [1],
      },
    }),
    [horariosTabla, onSelectHorario],
  );

  return (
    <div className="flex gap-2">
      <TablaDefault props={propsProfesionales} />
      <TablaDefault props={propsDias} />
      <TablaDefault props={propsHorarios} />
    </div>
  );
}
