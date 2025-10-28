import { useCallback, useEffect, useState } from "react";
import { Button } from "@/views/_components/Button";
import { useConfiguracionHorariosStore } from "../store/ConfiguracionHorariosStore";

// type DayId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type Modo = "alta" | "editar";

interface Props {
  modo?: Modo; // default: "alta"
  onClose?: () => void; // cerrar modal
}

export default function CardModal({ modo = "alta", onClose }: Props) {
  // --- store ---
  const seleccionado = useConfiguracionHorariosStore((s) => s.seleccionado);
  const agregarHorario = useConfiguracionHorariosStore((s) => s.agregarHorario);
  const editarHorario = useConfiguracionHorariosStore((s) => s.editingHorario);
  // const editingHorario = useConfiguracionHorariosStore((s) => s.editingHorario);
  const setEditingHorario = useConfiguracionHorariosStore((s) => s.setEditingHorario);

  // --- form local ---
  const [horaIni, setHoraIni] = useState("");
  const [horaFin, setHoraFin] = useState("");

  // const horarioParaEditar = useMemo(
  //   () => (modo === "editar" ? editingHorario : null),
  //   [modo, editingHorario],
  // );

  const resetForm = useCallback(() => {
    setHoraIni("");
    setHoraFin("");
  }, []);

  // precarga si es editar
  useEffect(() => {
    // if (horarioParaEditar) {
    //   setHoraIni(horarioParaEditar.hora_ini);
    //   setHoraFin(horarioParaEditar.hora_fin);
    // }
    if (modo === "alta") {
      // aseguramos que "Alta" esté siempre limpio
      setEditingHorario(null);
      resetForm();
    }
  }, [modo, setEditingHorario, resetForm]);

  // helper simple
  const validarHoras = () => {
    if (!horaIni || !horaFin) return "Completá ambas horas.";
    const [hiH, hiM] = horaIni.split(":").map(Number);
    const [hfH, hfM] = horaFin.split(":").map(Number);
    if ([hiH, hiM, hfH, hfM].some(Number.isNaN)) return "Formato inválido. Usá HH:MM.";
    if (hfH * 60 + hfM <= hiH * 60 + hiM) return "La hora fin debe ser posterior a la hora inicio.";
    return null;
  };

  const handleGuardar = useCallback(() => {
    const error = validarHoras();
    if (error) {
      alert(error);
      return;
    } else {
      // ALTA
      const { doctorId, dia } = seleccionado;
      if (!doctorId || !dia) {
        alert("Seleccioná primero un profesional y un día.");
        return;
      }
      agregarHorario({ hora_ini: horaIni, hora_fin: horaFin });
    }

    // limpiar estado de edición y cerrar
    setEditingHorario(null);
    resetForm();
    onClose?.();
  }, [
    modo,
    editarHorario,
    agregarHorario,
    seleccionado,
    horaIni,
    horaFin,
    setEditingHorario,
    resetForm,
    onClose,
  ]);

  // hotkeys: Enter = guardar, Esc = cerrar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleGuardar();
      } else if (e.key === "Escape") {
        e.preventDefault();
        setEditingHorario(null);
        resetForm();
        onClose?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleGuardar, onClose, resetForm, setEditingHorario]);

  return (
    <div className="w-[320px] flex flex-col items-center gap-4">
      <div className="w-full">
        <p className="mb-1 text-sm text-gray-500">
          {modo === "editar" ? "Modificar horario" : "Alta de horario"}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <label className="w-[100px] text-start font-medium text-primaryBlue">Hora Inicio:</label>
          <input
            type="time"
            value={horaIni}
            onChange={(e) => setHoraIni(e.target.value)}
            className="px-2 py-1 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-primaryGreen"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="w-[100px] text-start font-medium text-primaryBlue">Hora Fin:</label>
          <input
            type="time"
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
            className="px-2 py-1 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-primaryGreen"
          />
        </div>
      </div>

      <div className="flex justify-end w-full gap-2">
        <Button
          label="Grabar"
          classButton="bg-primaryGreen hover:bg-greenHover"
          type="button"
          handle={handleGuardar}
        />
        <Button
          label="Cancelar"
          classButton="bg-red-500 hover:bg-red-600"
          type="button"
          handle={() => {
            setEditingHorario(null);
            resetForm();
            onClose?.();
          }}
        />
      </div>
    </div>
  );
}
