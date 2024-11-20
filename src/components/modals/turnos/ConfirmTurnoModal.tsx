import { Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, Transition, TransitionChild, DialogPanel } from '@headlessui/react';
import { Turno } from '@/types/index';
import { useMutation } from '@tanstack/react-query';
import { confirmarTurno } from '@/services/TurnosService';
import { toast } from 'react-toastify';
// import { isAxiosError } from 'axios';
// import { ClipLoader } from 'react-spinners';
// import apiAuth from '@/lib/axiosNoAuth';

type ConfirmTurnoModalProps = {
  turnoData: Turno;
};

export default function ConfirmTurnoModal({ turnoData }: ConfirmTurnoModalProps) {
  const navigate = useNavigate();

  // console.log(turnoData);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modal = queryParams.get('confirmarTurno');
  const show = modal ? true : false;

  const fecha = new Date(turnoData?.fecha + 'T00:00:00'); // Asegúrate de que tenga una hora especificada para evitar problemas de zona horaria
  const fechaFormateada = fecha.toLocaleDateString('es-ES');
  // console.log(fecha);
  // console.log(fechaFormateada);

  const { mutate } = useMutation({
    mutationFn: confirmarTurno,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      // console.log(data);
      toast.success(data.message);
      navigate('/turnos');
    },
  });

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => navigate('/turnos')}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="flex flex-col items-center w-full max-w-2xl transform overflow-hidden bg-white text-left text-slate-800 rounded-lg shadow-xl transition-all p-8">
                  <div className="w-auto py-4 px-16 space-y-3 border-2 border-gray-500 rounded-lg bg-gray-100">
                    <h3 className="text-xl text-center font-semibold text-blue-600 mb-2 underline">
                      Detalles del turno:
                    </h3>
                    <div className="flex justify-start gap-2 items-center text-base">
                      <p className="w-[100px] text-right font-semibold text-gray-800">
                        Especialidad:
                      </p>
                      <p className="text-gray-600 italic">{turnoData?.nombreEspecialidad}</p>
                    </div>

                    <div className="flex justify-start gap-2 items-center text-base">
                      <p className="w-[100px] text-right font-semibold text-gray-800">Doctor:</p>
                      <p className="text-gray-600 italic">{turnoData?.nombreDoctor}</p>
                    </div>

                    <div className="flex justify-start gap-2 items-center text-base">
                      <p className="w-[100px] text-right font-semibold text-gray-800">Fecha:</p>
                      <p className="text-gray-600 italic">{fechaFormateada}</p>
                    </div>

                    <div className="flex justify-start gap-2 items-center text-base">
                      <p className="w-[100px] text-right font-semibold text-gray-800">Hora:</p>
                      <p className="text-gray-600 italic">{turnoData?.hora_ini}</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-600 text-gray-700 p-4 mt-10 mb-6">
                    <p className="font-semibold mb-2">Importante:</p>
                    <ul className="list-disc pl-5">
                      <li>Se enviará un email con los detalles del turno.</li>
                      <li>No olvides llevar tu DNI y el comprobante del turno recibido.</li>
                      <li>Debes estar al menos 20 minutos antes para pasar por mesa de entrada.</li>
                    </ul>
                  </div>

                  {/* Botón Confirmar */}
                  <div className="mt-6 w-full flex justify-center gap-6">
                    <button
                      onClick={() => mutate(turnoData)} // Aquí agregas la lógica para confirmar el turno
                      className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200 uppercase"
                    >
                      Confirmar Turno
                    </button>
                    <button
                      onClick={() => navigate('/turnos')} // Aquí agregas la lógica para confirmar el turno
                      className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200 uppercase"
                    >
                      Cancelar
                    </button>
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
