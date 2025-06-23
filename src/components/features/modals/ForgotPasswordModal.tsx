import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { olvidePassword } from "@/services/UserService";
import InputField from "@/components/ui/InputField";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Swal from "sweetalert2";

// import { Account } from '@/types/index';
// import { sendForgotPasswordEmail } from '../../utils/index';

export default function ForgotPasswordModal() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modal = queryParams.get("forgotPassword");
  const show = modal ? true : false;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { email: "" } });

  const { mutate } = useMutation({
    mutationFn: olvidePassword,
    onError: (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    },
    onSuccess: (data) => {
      Swal.fire({
        title: "Drag me!",
        icon: data,
        draggable: true,
      });
      reset();
      navigate("/");
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
          className="relative z-50"
          onClose={() => {
            navigate("/"), reset();
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
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-2xl p-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl text-slate-800 ">
                  <DialogTitle
                    as="h3"
                    className="mb-4 text-2xl font-semibold underline sm:text-3xl underline-offset-4 decoration-2"
                  >
                    Recuperar cuenta
                  </DialogTitle>

                  <p className="mb-2 sm:text-lg">
                    Ingresa tu email de registro, donde se te indicará como
                    recuperar tu cuenta:
                  </p>
                  <span className="my-2 text-sm italic font-thin text-green sm:text-xs">
                    * Recuerda que los links de recuperacion expiran. Te
                    recomendamos confirmar tu cuenta lo antes posible
                  </span>
                  <form
                    className="flex flex-col"
                    noValidate
                    onSubmit={handleSubmit(handleForm)}
                  >
                    <div className="flex flex-col">
                      <InputField
                        id={"email"}
                        type={"text"}
                        label={"Email"}
                        placeholder={"Ingresa tu email"}
                        register={register("email", {
                          required: {
                            value: true,
                            message: "El email es obligatorio",
                          },
                          pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Email inválido",
                          },
                        })}
                      />
                      {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                      )}
                    </div>
                    <input
                      type="submit"
                      value="Enviar"
                      className="w-full max-w-2xl p-2 my-3 text-base text-white uppercase transition-colors rounded shadow-lg cursor-pointer bg-green hover:bg-blue-700"
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
