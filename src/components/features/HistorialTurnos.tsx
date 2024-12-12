import { TurnosUsuario } from '@/types/index';

interface HistorialTurnosProps {
  turnosHistoricos: TurnosUsuario[] | undefined;
}

export default function HistorialTurnos({ turnosHistoricos }: HistorialTurnosProps) {
  console.log(turnosHistoricos);
  return <div className="text-white">Historial Turnos</div>;
}
