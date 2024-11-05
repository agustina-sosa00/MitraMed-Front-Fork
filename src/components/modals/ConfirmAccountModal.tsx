import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import api from '../../lib/axios';
import { isAxiosError } from 'axios';
import { ClipLoader } from 'react-spinners';

export default function ConfirmAccountModal() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const modal = queryParams.get('confirmar_cuenta');
  const show = modal ? true : false;
  const token = queryParams.get('token');

  const [backendMessage, setBackendMessage] = useState<string>('');
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Inicializar en false

  useEffect(() => {
    if (show && token && !hasFetched) {
      setIsLoading(true); // Inicia carga
      const fetchMessage = async () => {
        try {
          const { data } = await api.get(`/auth/confirmar_cuenta?token=${token}`);
          console.log(data);
          setBackendMessage(data);
          setIsTokenValid(true);
        } catch (error) {
          if (isAxiosError(error) && error.response) {
            setBackendMessage(error.response.data);
            setIsTokenValid(false); // Token inválido
          } else {
            setBackendMessage('Error desconocido al confirmar cuenta');
            setIsTokenValid(false);
          }
        } finally {
          setIsLoading(false); // Finaliza carga
          setHasFetched(true); // Marca como fetch realizado
        }
      };

      fetchMessage();
    } else if (!show) {
      // Si el modal se cierra, restablece el estado
      setHasFetched(false);
      setBackendMessage('');
      // setIsTokenValid(null); // Restablece el estado del token
    }
  }, [show, token, hasFetched]); // Asegúrate de que 'hasFetched' esté en las dependencias

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => navigate('/')}>
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
                <DialogPanel className="flex flex-col items-center w-full max-w-2xl transform overflow-hidden bg-white text-left text-slate-800 font-serif align-middle shadow-xl transition-all p-8 ">
                  {isLoading ? (
                    <div className="flex justify-center items-center mt-5">
                      <ClipLoader color="#36d7b7" size={80} />
                    </div>
                  ) : (
                    <>
                      {isTokenValid ? (
                        <div>
                          <svg
                            className="success icon-large fa-check-circle"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            style={{
                              fill: 'green',
                              width: '100px',
                              height: '100px',
                              opacity: '0.8',
                            }}
                          >
                            <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                          </svg>
                        </div>
                      ) : (
                        <div>
                          <svg
                            className="error-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="red"
                            width="120"
                            height="120"
                          >
                            <path d="M12 10.586l-4.293-4.293-1.414 1.414L10.586 12l-4.293 4.293 1.414 1.414L12 13.414l4.293 4.293 1.414-1.414L13.414 12l4.293-4.293-1.414-1.414z" />
                          </svg>
                        </div>
                      )}
                    </>
                  )}

                  <DialogTitle as="h3" className="text-xl font-semibold mt-6 decoration-2">
                    {backendMessage}
                  </DialogTitle>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
