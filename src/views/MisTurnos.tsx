import { anularTurnoUsuario, obtenerTurnosUsuario } from '@/services/TurnosService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TurnosUsuario } from '../types';
import { toast } from 'react-toastify';

export default function MisTurnos() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showHistorial, setShowHistorial] = useState(true);

  const { data: turnosUsuario, isLoading } = useQuery<TurnosUsuario[], Error>({
    queryKey: ['turnos-usuario'],
    queryFn: obtenerTurnosUsuario,
  });

  // Separar turnos pendientes y pasados
  const fechaActual = new Date();
  const turnosPasados =
    turnosUsuario?.filter((turno) => new Date(turno.f_turno) < fechaActual) || [];
  const turnosPendientes =
    turnosUsuario?.filter((turno) => new Date(turno.f_turno) >= fechaActual) || [];

  const formatFecha = (fechaString: string) => {
    const fecha = new Date(fechaString);

    const dia = fecha.getUTCDate().toString().padStart(2, '0');
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getUTCFullYear();

    return `${dia}/${mes}/${anio}`;
  };

  const formatHora = (hora: string) => {
    const date = new Date(hora); // Añadimos 'Z' para indicar UTC
    date.setHours(date.getHours() + 3); // Ajustamos según tu zona horaria (UTC+3)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: anularTurnoUsuario,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['turnos-usuario'] });
    },
  });

  const handleAnular = (idTurno: number) => {
    console.log(typeof idTurno);

    mutate(idTurno);
  };

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
          <p className="mt-4 sm:text-lg text-gray-200">
            Aquí puedes alternar entre tus turnos pendientes y el historial de turnos agendados.
          </p>

          {isLoading ? ( // Mostrar spinner durante la carga
            <div className="flex justify-center items-center mt-6">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : turnosUsuario && turnosUsuario.length === 0 ? ( // Mostrar mensaje si no hay datos
            <div className="mt-6 text-lg text-gray-200">No hay turnos para mostrar.</div>
          ) : (
            <div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowHistorial(true)}
                  className={`p-2 rounded-lg mx-2 text-white transition ${
                    showHistorial ? 'bg-blue-600' : 'bg-gray-400 text-black'
                  }`}
                >
                  Historial de Turnos
                </button>
                <button
                  onClick={() => setShowHistorial(false)}
                  className={`p-2 rounded-lg mx-2 text-white transition ${
                    !showHistorial ? 'bg-blue-600 ' : 'bg-gray-400 text-black'
                  }`}
                >
                  Turnos Pendientes
                </button>
              </div>

              {/* Mostrar turnos según la vista seleccionada */}
              <div className="mt-6 space-y-4">
                {showHistorial ? (
                  // Si estamos en el historial de turnos
                  turnosPasados.length === 0 ? (
                    <div className="mt-6 text-lg text-gray-200">No hay historial de turnos.</div>
                  ) : (
                    <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
                      {turnosPasados.map((turno) => (
                        <div
                          key={turno.idturno}
                          className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-300 text-gray-800 rounded-lg shadow-md border border-gray-300"
                        >
                          <div className="text-left">
                            <p className="text-sm">
                              <span className="font-semibold">Especialidad:</span>{' '}
                              {turno.especialidad}
                            </p>
                            <p className="text-sm">
                              <span className="font-semibold">Doctor:</span> {turno.ndoctor}
                            </p>
                            <p className="text-sm">
                              <span className="font-semibold">Fecha:</span>{' '}
                              {formatFecha(turno.f_turno)}
                            </p>
                            <p className="text-sm">
                              <span className="font-semibold">Hora:</span>{' '}
                              {formatHora(turno.hora_ini)}
                            </p>
                          </div>
                          <div className="mt-4 sm:mt-0">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-white ${
                                turno.asistecia === 0 ? 'bg-red-500' : 'bg-green-500'
                              }`}
                            >
                              {turno.asistecia === 0 ? '✘ No Asistió' : '✔ Asistió'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ) : // Si estamos en turnos pendientes
                turnosPendientes.length === 0 ? (
                  <div className="mt-6 text-lg text-gray-200">No tienes turnos pendientes.</div>
                ) : (
                  <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
                    {turnosPendientes
                      .filter((turno) => turno.habilitado === 1)
                      .map((turno) => (
                        <div
                          key={turno.idturno}
                          className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-300 text-gray-800 rounded-lg shadow-md border border-gray-300"
                        >
                          <div className="text-left">
                            <p className="text-sm">
                              <span className="font-semibold">Especialidad:</span>{' '}
                              {turno.especialidad}
                            </p>
                            <p className="text-sm">
                              <span className="font-semibold">Doctor:</span> {turno.ndoctor}
                            </p>
                            <p className="text-sm">
                              <span className="font-semibold">Fecha:</span>{' '}
                              {formatFecha(turno.f_turno)}
                            </p>
                            <p className="text-sm">
                              <span className="font-semibold">Hora:</span>{' '}
                              {formatHora(turno.hora_ini)}
                            </p>
                          </div>
                          <div className="mt-4 sm:mt-0">
                            <button
                              onClick={() => handleAnular(turno.idturno)}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                            >
                              Anular
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
