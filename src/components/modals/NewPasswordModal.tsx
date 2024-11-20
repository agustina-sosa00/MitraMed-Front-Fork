import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { reestablecerPassword } from '../../services/UserService';
import NewPasswordForm from '../forms/NewPasswordForm';
import { isAxiosError } from 'axios';
import { ClipLoader } from 'react-spinners';
import apiNoAuth from '@/lib/axiosNoAuth';
// import { Account } from '@/types/index';
// import { sendForgotPasswordEmail } from '../../utils/index';

export default function NewPasswordModal() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modal = queryParams.get('reestablecer_password');
  const show = modal ? true : false;

  const token = queryParams.get('token');

  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [backendMessage, setBackendMessage] = useState('');
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setBackendMessage('Token inválido');
        setIsTokenValid(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const response = await apiNoAuth.get(`/auth/verificar_token?token=${token}`);

        if (response.status === 200) {
          setIsTokenValid(true);
        }
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          setBackendMessage(error.response.data.error);
          setIsTokenValid(false); // Token inválido
        } else {
          setBackendMessage('Error desconocido');
          setIsTokenValid(false);
        }
      } finally {
        setIsLoading(false);
        setHasFetched(true);
      }
    };

    if (show && token) {
      validateToken();
    }
  }, [show, token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { password: '', repite_password: '' } });

  const { mutate } = useMutation({
    mutationFn: reestablecerPassword,
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate('/');
    },
  });

  const handleForm = ({
    password,
    repite_password,
  }: {
    password: string;
    repite_password: string;
  }) => {
    console.log();

    if (password !== repite_password) {
      console.error('Las contraseñas no coinciden');
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (token) {
      // Verificar que token no sea null
      console.log({ token, password });
      mutate({ token, password }); // Pasar el objeto con token y password
    } else {
      console.error('Token no válido');
      toast.error('Token no válido');
    }
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            navigate('/');
            reset();
          }}
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
                <DialogPanel className="w-full max-w-2xl transform overflow-hidden bg-white text-left text-slate-800 align-middle shadow-xl transition-all p-8 ">
                  <DialogTitle
                    as="h3"
                    className="text-3xl font-semibold mb-4 underline underline-offset-4 decoration-2"
                  >
                    {isLoading || backendMessage ? '' : 'Reestablecer contraseña'}
                  </DialogTitle>

                  {isLoading ? (
                    <div className="flex justify-center items-center mt-5">
                      <ClipLoader color="#36d7b7" size={80} />
                    </div>
                  ) : hasFetched && isTokenValid ? (
                    <form className="flex flex-col" noValidate onSubmit={handleSubmit(handleForm)}>
                      <p className="text-amber-500 font-thin text-xs italic my-2">
                        *Esta ventana es de un solo uso. Te recomendamos cambiar tu contraseña antes
                        de salir. De lo contrario, deberás solicitar un nuevo link de recuperación.
                      </p>
                      <NewPasswordForm register={register} errors={errors} />

                      <input
                        type="submit"
                        value="Enviar"
                        className="p-2 my-3 w-full max-w-2xl text-white text-base uppercase bg-lime-700 hover:bg-lime-800  transition-colors cursor-pointer shadow-lg"
                      />
                    </form>
                  ) : (
                    <div className="flex flex-col justify-center items-center">
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
                      <p className="text-center">{backendMessage}</p>
                    </div>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
