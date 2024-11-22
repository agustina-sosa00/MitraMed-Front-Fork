import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NewAccount } from '../../../types';
import RegisterForm from '../../forms/RegisterForm';
import { useMutation } from '@tanstack/react-query';
import { crearCuenta } from '@/services/UserService';
import { toast } from 'react-toastify';

export default function CreateAccountModal() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modal = queryParams.get('createAccount');
  const show = modal ? true : false;

  const initialValues: NewAccount = {
    nombre: '',
    apellido: '',
    email: '',
    fnac: '',
    genero: '',
    password: '',
    confirmPassword: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: crearCuenta,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate('/');
      reset();
    },
  });

  const handleForm = (formData: NewAccount) => mutate(formData);

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
                <DialogPanel className="w-full max-w-xl transform overflow-hidden bg-white text-left text-slate-800 shadow-xl transition-all px-8 py-8 rounded-lg">
                  <DialogTitle
                    as="h3"
                    className="text-3xl font-semibold mb-6 text-center text-gray-800 underline"
                  >
                    Crea tu cuenta
                  </DialogTitle>

                  <p className="text-sm text-gray-600 mb-6 text-center">
                    Llena el formulario para registrarte y recibirás un correo para confirmar tu
                    cuenta.
                  </p>

                  <form className="mt-5" noValidate onSubmit={handleSubmit(handleForm)}>
                    <div className="flex flex-col gap-4">
                      <RegisterForm register={register} errors={errors} watch={watch} />
                      <input
                        type="submit"
                        value="Registrarme"
                        className="p-2 my-3 max-w-lg text-white text-base uppercase bg-blue-600 hover:bg-blue-700  transition-colors cursor-pointer shadow-lg rounded"
                      />
                    </div>
                  </form>

                  <div className="flex flex-col items-start my-3 mx-2 gap-2">
                    <p className="">
                      Ya tienes una cuenta?{' '}
                      <button
                        className="text-amber-500 hover:underline"
                        onClick={() => navigate('/')}
                      >
                        Inicia sesión aquí
                      </button>
                    </p>
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
