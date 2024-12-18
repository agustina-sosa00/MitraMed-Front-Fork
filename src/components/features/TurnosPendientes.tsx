import { anularTurnoUsuario } from '@/services/TurnosService';
import { TurnosUsuario } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface TurnosPendientesProps {
  turnosPendientes: TurnosUsuario[] | undefined;
}

export default function TurnosPendientes({ turnosPendientes }: TurnosPendientesProps) {
  const [mostrarModalAnular, setMostrarModalAnular] = useState(false);
  const [turnoAnula, setTurnoAnula] = useState<number | null>(null);
  const [loadingAnula, setIsLoadingAnula] = useState(false);

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

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: anularTurnoUsuario,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(data);
      setIsLoadingAnula(false);
      setMostrarModalAnular(false);
      setTurnoAnula(null);
      queryClient.invalidateQueries({ queryKey: ['turnos-pendientes'] });
    },
  });

  const handleAnular = (idTurno: number) => {
    setTurnoAnula(idTurno); // Establecer el turno a anular
    setMostrarModalAnular(true); // Mostrar el modal
  };

  const handleCancelar = () => {
    setMostrarModalAnular(false); // Cerrar el modal sin hacer nada
    setTurnoAnula(null); // Resetear el turno seleccionado
  };

  const handleConfirm = () => {
    if (turnoAnula !== null) {
      setIsLoadingAnula(true); // Iniciar carga
      console.log('Turno que desea anular: ', turnoAnula); // Llamar la función de anulación
      mutate(turnoAnula);
    }
  };

  if (!turnosPendientes || turnosPendientes.length === 0) {
    return <div className="text-white text-center">No hay turnos pendientes</div>;
  }

  return (
    <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
      {turnosPendientes.map((turno) => (
        <div
          key={turno.idturno}
          className="flex flex-col sm:flex-row items-center mb-2 justify-between p-4 bg-slate-300 text-gray-800 rounded-lg shadow-md border border-gray-300"
        >
          <div className="text-left">
            <p className="text-sm">
              <span className="font-semibold">Especialidad: </span> {turno.nespecialidad}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Doctor: </span> {turno.ndoctor}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Fecha: </span> {formatearFecha(turno.fecha)}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Día: </span> {turno.dia}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Hora: </span>
              {turno.hora_ini}
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
      {mostrarModalAnular && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4 text-center">¿Estás seguro de anular este turno?</h3>

            {/* Si loadingAnula es true, mostramos el cargador en el área central debajo del título */}
            {loadingAnula ? (
              <div className="flex justify-center items-center mb-2">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="flex justify-around mt-6">
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                  disabled={loadingAnula} // Deshabilitar el botón mientras se está cargando
                >
                  Confirmar
                </button>
                <button
                  onClick={handleCancelar}
                  className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition duration-200"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
