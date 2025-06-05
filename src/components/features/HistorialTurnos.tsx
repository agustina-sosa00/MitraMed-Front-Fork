import { TurnosUsuario } from "@/types/index";
import { Card } from "../ui/Card";

interface HistorialTurnosProps {
  turnosHistoricos: TurnosUsuario[] | undefined;
}

export default function HistorialTurnos({
  turnosHistoricos,
}: HistorialTurnosProps) {
  const formatearFecha = (fecha: string): string => {
    const date = new Date(fecha);

    // Verifica si la fecha es válida
    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    // Ajustamos la fecha a UTC para evitar el desfase
    const dia = String(date.getUTCDate()).padStart(2, "0");
    const mes = String(date.getUTCMonth() + 1).padStart(2, "0"); // Los meses inician en 0
    const anio = date.getUTCFullYear();

    return `${dia}-${mes}-${anio}`;
  };

  if (!turnosHistoricos || turnosHistoricos.length === 0) {
    return (
      <div className="text-center text-white">
        No hay historial de turnos al día de hoy.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center w-full gap-3 px-3 overflow-y-auto max-h-96 ">
      {turnosHistoricos.map((turno) => (
        <Card
          key={turno.idturno}
          especialidad={turno.nespecialidad}
          doctor={turno.ndoctor}
          fecha={formatearFecha(turno.fecha)}
          dia={turno.dia}
          hora={turno.hora_ini}
        />
      ))}
    </div>
  );
}
