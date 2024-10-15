import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { reestablecerPassword } from '../../services/UserService';
import NewPasswordForm from '../forms/NewPasswordForm';
import api from '../../lib/axios';
// import { Account } from '@/types/index';
// import { sendForgotPasswordEmail } from '../../utils/index';

export default function NewPasswordModal() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modal = queryParams.get('reestablecer_password');
  const show = modal ? true : false;

  const token = queryParams.get('token');

  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await api.get(`/auth/verificar_token?token=${token}`);
        console.log(response);
        if (response.status === 200) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
        }
      } catch (error) {
        console.log(error);
        setIsTokenValid(false);
      }
    };

    validateToken();
  }, [token]);

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
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success('Contraseña reestablecida exitosamente. Ahora puedes iniciar sesión');
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
            navigate('/'), reset();
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
                <DialogPanel className="w-full max-w-2xl transform overflow-hidden bg-white text-left text-slate-800 font-serif align-middle shadow-xl transition-all p-8 ">
                  <DialogTitle
                    as="h3"
                    className="text-3xl font-semibold mb-4 underline underline-offset-4 decoration-2"
                  >
                    {isTokenValid === null
                      ? ''
                      : isTokenValid === true
                      ? 'Reestablecer contraseña'
                      : ''}
                  </DialogTitle>

                  {isTokenValid === null ? (
                    <p className="text-center">Verificando el enlace...</p>
                  ) : isTokenValid ? (
                    <form className="flex flex-col" noValidate onSubmit={handleSubmit(handleForm)}>
                      <NewPasswordForm register={register} errors={errors} />

                      <input
                        type="submit"
                        value="Enviar"
                        className="p-2 my-3 w-full max-w-2xl text-white text-base uppercase bg-lime-700 hover:bg-lime-800  transition-colors cursor-pointer shadow-lg"
                      />
                    </form>
                  ) : (
                    <p className="text-center mt-5">
                      El enlace para reestablecer su contraseña ha expirado o es inválido.
                    </p>
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
