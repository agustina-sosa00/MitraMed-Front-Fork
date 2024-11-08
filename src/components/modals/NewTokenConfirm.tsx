import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import InputField from '../InputField';
import ErrorMessage from '../ErrorMessage';
import { nuevoToken } from '@/services/UserService';
// import { Account } from '@/types/index';
// import { sendForgotPasswordEmail } from '../../utils/index';

export default function NewTokenConfirm() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modal = queryParams.get('newTokenConfirm');
  const show = modal ? true : false;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { email: '' } });

  const { mutate } = useMutation({
    mutationFn: nuevoToken,
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

  const handleForm = (formData: { email: string }) => {
    mutate(formData);
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
                    Reenviar correo de confirmación
                  </DialogTitle>

                  <p className="text-lg">
                    Ingresa tu email de registro, donde se te reenviará el correo para confirmar tu
                    cuenta:
                  </p>
                  <span className="text-amber-500 font-thin text-xs italic my-2">
                    * Recuerda que los links de confirmación expiran. Te recomendamos confirmar tu
                    cuenta lo antes posible
                  </span>
                  <form className="flex flex-col" noValidate onSubmit={handleSubmit(handleForm)}>
                    <div className="flex flex-col">
                      <InputField
                        id={'email'}
                        type={'text'}
                        label={'Email'}
                        placeholder={'Ingresa tu email'}
                        register={register('email', {
                          required: {
                            value: true,
                            message: 'El email es obligatorio',
                          },
                          pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: 'Email inválido',
                          },
                        })}
                      />
                      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </div>
                    <input
                      type="submit"
                      value="Enviar"
                      className="p-2 my-3 w-full max-w-2xl text-white text-base uppercase bg-lime-700 hover:bg-lime-800  transition-colors cursor-pointer shadow-lg"
                    />
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
