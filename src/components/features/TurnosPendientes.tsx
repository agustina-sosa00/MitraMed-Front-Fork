import { TurnosUsuario } from '@/types/index';

interface TurnosPendientesProps {
  turnosPendientes: TurnosUsuario[] | undefined;
}

export default function TurnosPendientes({ turnosPendientes }: TurnosPendientesProps) {
  console.log(turnosPendientes);
  return <div className="text-white">Turnos Pendientes</div>;
}
