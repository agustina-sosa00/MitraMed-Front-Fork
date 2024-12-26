import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { obtenerTurnosHistoricos, obtenerTurnosPendientes } from '@/services/TurnosService';
import { TurnosUsuario } from '@/types/index';
import TurnosPendientes from '@/components/features/TurnosPendientes';
import HistorialTurnos from '@/components/features/HistorialTurnos';

export default function MisTurnos() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [vista, setVista] = useState<'pendientes' | 'historicos'>('pendientes');

  const { data: turnosPendientes, isLoading: isLoadingPendientes } = useQuery<
    TurnosUsuario[],
    Error
  >({
    queryKey: ['turnos-pendientes'],
    queryFn: obtenerTurnosPendientes,
    refetchOnWindowFocus: false,
  });

  const { data: turnosHistoricos, isLoading: isLoadingHistoricos } = useQuery<
    TurnosUsuario[],
    Error
  >({
    queryKey: ['turnos-historicos'],
    queryFn: obtenerTurnosHistoricos,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex justify-center relative min-h-full">
      <div className="absolute -top-5 left-1">
        <Link
          to="/inicio"
          className="py-2 px-4 text-xs sm:text-base font-semibold bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition duration-200"
        >
          Volver
        </Link>
      </div>

      <div className="p-6 pb-10 w-full max-w-4xl h-full my-5 bg-blue-800 shadow-xl border border-black border-opacity-20 rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-200 underline uppercase mb-4">
            Mis turnos
          </h2>

          {/* Botones para cambiar entre vistas */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setVista('pendientes')}
              className={`p-2 rounded-lg mx-2 text-white transition ${
                vista === 'pendientes' ? 'bg-blue-600' : 'bg-gray-400'
              }`}
            >
              Turnos Pendientes
            </button>
            <button
              onClick={() => setVista('historicos')}
              className={`p-2 rounded-lg mx-2 text-white transition ${
                vista === 'historicos' ? 'bg-blue-600' : 'bg-gray-400'
              }`}
            >
              Historial de Turnos
            </button>
          </div>

          {/* Mostrar componente dependiendo del estado */}
          {isLoadingPendientes || isLoadingHistoricos ? (
            <div className="flex justify-center items-center mt-6">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div>
              {vista === 'pendientes' ? (
                <div>
                  <TurnosPendientes turnosPendientes={turnosPendientes} />
                </div>
              ) : (
                <div className="">
                  <HistorialTurnos turnosHistoricos={turnosHistoricos} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
