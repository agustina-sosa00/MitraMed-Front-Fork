import { anularTurnoUsuario } from "@/views/app/paciente/turnos/services/TurnosService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import { CardMisTurnosPaciente } from "@/views/auth/components/ui/CardMisTurnosPaciente";
import { TurnosUsuario } from "@/views/auth/types";

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
      return "Fecha inválida";
    }

    // Ajustamos la fecha a UTC para evitar el desfase
    const dia = String(date.getUTCDate()).padStart(2, "0");
    const mes = String(date.getUTCMonth() + 1).padStart(2, "0"); // Los meses inician en 0
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
      Swal.fire({
        title: data,
        icon: "success",
        draggable: true,
      });
      setIsLoadingAnula(false);
      setMostrarModalAnular(false);
      setTurnoAnula(null);
      queryClient.invalidateQueries({ queryKey: ["turnos-pendientes"] });
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
      mutate(turnoAnula);
    }
  };

  if (!turnosPendientes || turnosPendientes.length === 0) {
    return <div className="text-center text-blue">No hay turnos pendientes</div>;
  }

  return (
    <div className="flex flex-wrap items-center justify-center w-full gap-3 px-3 overflow-y-auto max-h-96 ">
      {turnosPendientes.map((turno) => (
        <>
          <CardMisTurnosPaciente
            key={turno.idturno}
            especialidad={turno.nespecialidad}
            doctor={turno.ndoctor}
            id={turno.idturno}
            fecha={formatearFecha(turno.fecha)}
            dia={turno.dia}
            hora={turno.hora_ini}
            handle={() => handleAnular(turno.idturno)}
            textButton="Anular turno"
          />
          {/* <div
            key={turno.idturno}
            className="flex flex-col items-center justify-between w-full p-4 mb-2 bg-white border border-gray-300 rounded-lg shadow-md sm:flex-row text-blue "
          >
            <div className="text-left">
              <p className="text-sm">
                <span className="font-semibold">Especialidad: </span>{" "}
                {turno.nespecialidad}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Doctor: </span> {turno.ndoctor}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Fecha: </span>{" "}
                {formatearFecha(turno.fecha)}
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
                className="px-4 py-2 text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600"
              >
                Anular
              </button>
            </div>
          </div> */}
        </>
      ))}
      {mostrarModalAnular && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h3 className="mb-4 text-xl text-center">¿Estás seguro de anular este turno?</h3>

            {/* Si loadingAnula es true, mostramos el cargador en el área central debajo del título */}
            {loadingAnula ? (
              <div className="flex items-center justify-center mb-2">
                <div className="w-12 h-12 border-4 border-gray-300 rounded-full border-t-blue-500 animate-spin"></div>
              </div>
            ) : (
              <div className="flex justify-around mt-6">
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 text-white transition duration-200 rounded-lg bg-green hover:bg-green-600"
                  disabled={loadingAnula} // Deshabilitar el botón mientras se está cargando
                >
                  Confirmar
                </button>
                <button
                  onClick={handleCancelar}
                  className="px-4 py-2 text-white transition duration-200 bg-red-400 rounded-lg hover:bg-red-500"
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
