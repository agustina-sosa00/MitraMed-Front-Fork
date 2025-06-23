import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { Turno } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmarTurno } from "@/services/TurnosService";
import { UseFormSetValue } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

type ConfirmTurnoModalProps = {
  turnoData: Turno;
  setValue: UseFormSetValue<Turno>;
};

export default function ConfirmTurnoModal({
  turnoData,
  setValue,
}: ConfirmTurnoModalProps) {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modal = queryParams.get("confirmarTurno");
  const show = modal ? true : false;

  const fecha = new Date(turnoData?.fecha + "T00:00:00");
  const fechaFormateada = fecha.toLocaleDateString("es-ES");

  const [loadingConfirm, setLoadingConfirm] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: confirmarTurno,
    onError: (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    },
    onSuccess: (data) => {
      Swal.fire({
        title: data,
        icon: "success",
        draggable: true,
      });
      setValue("turno", 0);
      queryClient.invalidateQueries({ queryKey: ["turnos"] });

      navigate(location.pathname, { replace: true });
    },
  });

  const handleConfirmar = () => {
    setLoadingConfirm(true); // Activa el loader
    mutate(turnoData, {
      onSettled: () => setLoadingConfirm(false), // Desactiva el loader después de completar
    });
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          onClose={() => navigate(location.pathname, { replace: true })}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="flex flex-col items-center w-full max-w-2xl p-8 overflow-y-auto max-h-[70vh] text-left transition-all transform bg-white rounded-lg shadow-xl text-slate-800 gap-5">
                  <div className="w-auto px-10 py-4  bg-gray-100  border-[#f1f1f1] rounded-lg sm:px-16 flex flex-col justify-center items-start  ">
                    <div className="flex items-center justify-center w-full">
                      <h3 className="mb-2 text-xl font-semibold text-center text-green">
                        Detalles del turno:
                      </h3>
                    </div>

                    <div className="flex items-start justify-start w-full gap-2 text-base">
                      <p className="font-semibold text-blue">Especialidad:</p>
                      <p className="italic text-gray-600">
                        {turnoData?.nombreEspecialidad}
                      </p>
                    </div>

                    <div className="flex items-start justify-start w-full gap-2 text-base">
                      <p className="font-semibold text-blue">Doctor:</p>
                      <p className="italic text-gray-600">
                        {turnoData?.nombreDoctor}
                      </p>
                    </div>

                    <div className="flex items-center justify-start gap-2 text-base">
                      <p className="font-semibold text-right text-blue">
                        Fecha:
                      </p>
                      <p className="italic text-gray-600">{fechaFormateada}</p>
                    </div>

                    <div className="flex items-center justify-start gap-2 text-base">
                      <p className="font-semibold text-right text-blue">Día:</p>
                      <p className="italic text-gray-600">
                        {
                          [
                            "Lunes",
                            "Martes",
                            "Miércoles",
                            "Jueves",
                            "Viernes",
                            "Sábado",
                          ][new Date(turnoData?.fecha).getDay()]
                        }
                      </p>
                    </div>

                    <div className="flex items-center justify-start gap-2 text-base">
                      <p className="font-semibold text-right text-blue">
                        Hora:
                      </p>
                      <p className="italic text-gray-600">
                        {turnoData?.hora_ini}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 mb-6 border-l-4 border-blue-600 text-blue bg-blue-50">
                    <p className="mb-2 font-semibold">Importante:</p>
                    <ul className="pl-5 list-disc">
                      <li>Se enviará un email con los detalles del turno.</li>
                      <li>
                        No olvides llevar tu DNI y el comprobante del turno
                        recibido.
                      </li>
                      <li>
                        Debes estar al menos 20 minutos antes para pasar por
                        mesa de entrada.
                      </li>
                    </ul>
                  </div>

                  {/* Botón Confirmar */}
                  <div className="relative flex justify-center w-full gap-6 ">
                    <button
                      onClick={handleConfirmar}
                      disabled={loadingConfirm} // Desactiva el botón durante la carga
                      className={`px-6 py-2 bg-green text-white text-sm sm:text-base font-semibold rounded-lg shadow-md 
                                ${
                                  loadingConfirm
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-greenHover"
                                }
                                transition duration-200 uppercase`}
                    >
                      {loadingConfirm ? "Confirmando..." : "Confirmar Turno"}
                    </button>

                    {/* Oculta el botón de cancelar si está cargando */}
                    {!loadingConfirm && (
                      <button
                        onClick={() => navigate("/turnos")}
                        className="px-6 py-2 text-sm font-semibold text-white uppercase transition duration-200 bg-red-600 rounded-lg shadow-md sm:text-base hover:bg-red-700"
                      >
                        Cancelar
                      </button>
                    )}

                    {/* Loader en el centro del modal */}
                    {loadingConfirm && (
                      <div className="absolute flex items-center justify-center bottom-11">
                        <ClipLoader size={40} color="#16a34a" />
                      </div>
                    )}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
