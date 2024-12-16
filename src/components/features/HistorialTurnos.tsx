import { TurnosUsuario } from '@/types/index';

interface HistorialTurnosProps {
  turnosHistoricos: TurnosUsuario[] | undefined;
}

export default function HistorialTurnos({ turnosHistoricos }: HistorialTurnosProps) {
  const formatearFecha = (fecha: string): string => {
    const date = new Date(fecha);

    // Verifica si la fecha es válida
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }

    // Ajustamos la fecha a UTC para evitar el desfase
    const dia = String(date.getUTCDate()).padStart(2, '0');
    const mes = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses inician en 0
    const anio = date.getUTCFullYear();

    return `${dia}-${mes}-${anio}`;
  };

  if (!turnosHistoricos || turnosHistoricos.length === 0) {
    return <div className="text-white text-center">No hay historial de turnos al día de hoy.</div>;
  }

  return (
    <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
      {turnosHistoricos.map((turno) => (
        <div
          key={turno.idturno}
          className="flex flex-col sm:flex-row items-center justify-between p-4 mb-2 bg-slate-300 text-gray-800 rounded-lg shadow-md border border-gray-300"
        >
          <div className="text-left">
            <p className="text-sm">
              <span className="font-semibold">Especialidad:</span> {turno.nespecialidad}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Doctor:</span> {turno.ndoctor}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Fecha:</span> {formatearFecha(turno.fecha)}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Día: </span> {turno.dia}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Hora:</span>
              {turno.hora_ini}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
