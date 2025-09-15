import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import RegisterForm from "../forms/RegisterForm";
import { useMutation } from "@tanstack/react-query";
import { googleAuth } from "@/views/auth/services/UserService";
import Cookies from "js-cookie";
import { Fragment, useEffect, useState } from "react";
import { Loader } from "@/views/auth/components/ui/Loader";
import Swal from "sweetalert2";
import { Usuario } from "@/views/auth/types";

export const ConfirmDataUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dataFromBack = location.state?.dataBack;
  const faltantes = dataFromBack;
  const dataFromGoogle = location.state?.dataGoogle;
  const queryParams = new URLSearchParams(location.search);
  const [loader, setLoader] = useState(false);
  const modal = queryParams.get("confirmDataUser");
  const show = modal ? true : false;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
  } = useForm<Usuario>({
    defaultValues: {
      nombre: dataFromGoogle?.nombre,
      apellido: dataFromGoogle?.apellido,
      email: dataFromGoogle?.email,
      fnac: dataFromGoogle?.fnac,
      codarea: dataFromGoogle?.codarea,
      telefono: dataFromGoogle?.telefono,
      genero: dataFromGoogle?.genero,
    },
  });

  useEffect(() => {
    if (dataFromGoogle) {
      reset({ ...dataFromGoogle });
    }
  }, [dataFromGoogle, reset]);

  const { mutate } = useMutation({
    mutationFn: googleAuth,
    onError: (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    },
    onSuccess: (data) => {
      if (data && data?.status === 202) {
        navigate(location.pathname + "?confirmDataUser=true", {
          state: {
            dataBack: data?.faltantes,
            dataGoogle: dataFromGoogle,
          },
          replace: true,
        });
      } else {
        localStorage.setItem("nombreUsuario", data.nombre_usuario);
        Cookies.set("accessToken", data.token_acceso, { expires: 0.3333 });
        Cookies.set("refreshToken", data.token_refresh, { expires: 0.5 });
        navigate("/inicio");
      }
    },
  });

  const handleOnSubmit = (data: Usuario) => {
    setLoader(true);

    mutate(data);
  };
  return (
    <>
      <Transition appear show={!!show} as={Fragment}>
        <Dialog
          onClose={() => {
            navigate("/");
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <DialogPanel className="flex flex-col items-center w-full max-w-2xl p-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl text-slate-800 ">
                  <DialogTitle
                    as="h3"
                    className="mb-6 text-3xl font-semibold text-center text-green"
                  >
                    Completa tus datos
                  </DialogTitle>
                  <p className="mb-6 text-sm text-center text-blue">
                    Para finalizar el proceso de autenticación, por favor complete los datos
                    faltantes.
                  </p>
                  <form onSubmit={handleSubmit(handleOnSubmit)} className="p-2">
                    <div className="flex flex-col gap-3 px-10">
                      <RegisterForm
                        register={register}
                        errors={errors}
                        watch={watch}
                        control={control}
                        formGoogle={true}
                        faltantes={faltantes}
                      />
                      <input
                        type="submit"
                        value="Confirmar"
                        className="max-w-lg px-4 py-1 my-3 text-base text-white uppercase transition-colors rounded shadow-lg cursor-pointer bg-green hover:bg-greenHover"
                      />
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>{" "}
            </div>{" "}
          </div>
        </Dialog>
      </Transition>

      {loader && <Loader show={true} message="Guardando datos. Aguarde un momento..." />}
    </>
  );
};
