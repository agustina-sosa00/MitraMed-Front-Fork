import { Link } from "react-router-dom";
// import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  obtenerTurnosHistoricos,
  obtenerTurnosPendientes,
} from "@/services/TurnosService";
import { TurnosUsuario } from "@/types/index";
import TurnosPendientes from "@/components/features/TurnosPendientes";
import HistorialTurnos from "@/components/features/HistorialTurnos";

export default function MisTurnos() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [vista, setVista] = useState<"pendientes" | "historicos">("pendientes");

  const { data: turnosPendientes, isLoading: isLoadingPendientes } = useQuery<
    TurnosUsuario[],
    Error
  >({
    queryKey: ["turnos-pendientes"],
    queryFn: obtenerTurnosPendientes,
    refetchOnWindowFocus: false,
  });

  const { data: turnosHistoricos, isLoading: isLoadingHistoricos } = useQuery<
    TurnosUsuario[],
    Error
  >({
    queryKey: ["turnos-historicos"],
    queryFn: obtenerTurnosHistoricos,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="relative flex flex-col items-center justify-center h-full py-10 bg-bottom bg-cover sm:min-h-screen bg-misturnos ">
      <div className="w-full h-full max-w-6xl  my-5 bg-[white] border border-black rounded-lg shadow-xl border-opacity-20">
        <div className="flex flex-col gap-5 py-5 text-center ">
          <h2 className="text-2xl font-bold uppercase text-green sm:text-3xl">
            Mis turnos
          </h2>

          {/* Botones para cambiar entre vistas */}
          <div className="flex justify-center gap-2 ">
            <button
              onClick={() => setVista("pendientes")}
              className={`px-4 py-1  rounded text-sm  text-white transition ${
                vista === "pendientes" ? "bg-blue" : "bg-gray-400"
              }`}
            >
              Turnos Pendientes
            </button>
            <button
              onClick={() => setVista("historicos")}
              className={`px-4 py-1 rounded text-sm  text-white transition ${
                vista === "historicos" ? "bg-blue" : "bg-gray-400"
              }`}
            >
              Historial de Turnos
            </button>
          </div>

          {/* Mostrar componente dependiendo del estado */}
          {isLoadingPendientes || isLoadingHistoricos ? (
            <div className="flex items-center justify-center mt-6">
              <div className="w-12 h-12 border-4 border-gray-300 rounded-full border-t-blue-500 animate-spin"></div>
            </div>
          ) : (
            <div>
              {vista === "pendientes" ? (
                <div className="">
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
