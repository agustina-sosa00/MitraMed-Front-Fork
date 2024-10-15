import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { toast } from 'react-toastify';
// import { generateToken, sendRegisterEmail } from '../../utils/index';
import { crearCuenta } from '../../services/UserService';
import { NewAccount } from '../../types';
import RegisterForm from '../forms/RegisterForm';
// import Captcha from '../forms/Captcha';

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
      console.log(error);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate('/');
    },
  });

  const handleForm = (formData: NewAccount) => {
    console.log(formData);
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error('Las contraseñas deben ser idénticas');
      return;
    }

    mutate(formData);
  };
  // const token = generateToken();
  // sendRegisterEmail({
  //   userName: formData.nombre,
  //   userEmail: formData.email,
  //   token: token,
  // });

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            navigate(-1), reset();
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
                <DialogPanel className="w-full max-w-xl transform overflow-hidden bg-white text-left text-slate-800 font-serif align-middle shadow-xl transition-all px-10 py-7 rounded">
                  <DialogTitle
                    as="h3"
                    className="text-3xl font-semibold mb-4 underline underline-offset-4 decoration-2"
                  >
                    Crea tu cuenta
                  </DialogTitle>

                  <p className="text-lg">
                    Llena el formulario para registrarte. <br /> Recibirás un correo para confirmar
                    tu cuenta
                  </p>

                  <form className="mt-5" noValidate onSubmit={handleSubmit(handleForm)}>
                    <div className="flex flex-col gap-4">
                      <RegisterForm register={register} errors={errors} watch={watch} />

                      {/* <Captcha /> */}
                      <input
                        type="submit"
                        value="Registrarme"
                        className="p-2 my-3 max-w-lg text-white text-base uppercase bg-lime-700 hover:bg-lime-800  transition-colors cursor-pointer shadow-lg"
                      />
                    </div>
                  </form>

                  <div className="flex flex-col items-start my-3 mx-2 gap-2 font-serif">
                    <p className="">
                      Ya tienes una cuenta?{' '}
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => navigate(-1)}
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
