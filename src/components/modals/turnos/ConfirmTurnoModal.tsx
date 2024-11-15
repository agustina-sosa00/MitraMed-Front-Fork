import { Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, Transition, TransitionChild, DialogPanel } from '@headlessui/react';
import { TurnoData } from '@/types/index';
// import { isAxiosError } from 'axios';
// import { ClipLoader } from 'react-spinners';
// import apiAuth from '@/lib/axiosNoAuth';

type ConfirmTurnoModalProps = {
  turnoData: TurnoData | null;
};

export default function ConfirmTurnoModal({ turnoData }: ConfirmTurnoModalProps) {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modal = queryParams.get('confirmarTurno');
  const show = modal ? true : false;

  const fecha = new Date(turnoData?.fecha + 'T00:00:00'); // Asegúrate de que tenga una hora especificada para evitar problemas de zona horaria
  const fechaFormateada = fecha.toLocaleDateString('es-ES');
  console.log(fechaFormateada);

  //   const fecha = new Date(turnoData?.fecha + 'T00:00:00');
  //   const fechaFormateada = new Intl.DateTimeFormat('es-ES').format(fecha);

  //   const [backendMessage, setBackendMessage] = useState<string>('');
  //   const [hasFetched, setHasFetched] = useState(false);
  //   const [isLoading, setIsLoading] = useState(true); // Inicializar en false

  //   useEffect(() => {
  //     if (show && !hasFetched) {
  //       setIsLoading(true); // Inicia carga
  //       const fetchMessage = async () => {
  //         try {
  //           const { data } = await apiAuth.get(`/auth/confirmar_turno`);
  //           console.log(data);
  //           setBackendMessage(data);
  //         } catch (error) {
  //           if (isAxiosError(error) && error.response) {
  //             setBackendMessage(error.response.data);
  //           } else {
  //             setBackendMessage('Error desconocido al confirmar cuenta');
  //           }
  //         } finally {
  //           setIsLoading(false); // Finaliza carga
  //           //   setHasFetched(true); // Marca como fetch realizado
  //         }
  //       };

  //       fetchMessage();
  //     } else if (!show) {
  //       // Si el modal se cierra, restablece el estado
  //       setHasFetched(false);
  //       setBackendMessage('');
  //       // setIsTokenValid(null); // Restablece el estado del token
  //     }
  //   }, [show, hasFetched]); // Asegúrate de que 'hasFetched' esté en las dependencias

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
                      <p className="text-gray-600 italic">{turnoData?.horaTurno}</p>
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
                      onClick={() => navigate('/turnos')} // Aquí agregas la lógica para confirmar el turno
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
