import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { reestablecerPassword } from "@/views/auth/services/UserService";
import { isAxiosError } from "axios";
import { ClipLoader } from "react-spinners";
import apiNoAuth from "@/lib/axiosNoAuth";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import NewPasswordForm from "../forms/NewPasswordForm";

export default function NewPasswordModal() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modal = queryParams.get("reestablecer_password");
  const show = modal ? true : false;
  const internalRequest = queryParams.get("internal") === "true";
  const token = queryParams.get("token");

  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [backendMessage, setBackendMessage] = useState("");
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const validateToken = async () => {
      if (internalRequest) {
        setIsTokenValid(true);
        setHasFetched(true);
        setIsLoading(false);
        return;
      }

      if (!token) {
        setBackendMessage("Token inválido");
        setIsTokenValid(false);
        setIsLoading(false);
        setHasFetched(true);
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
          setBackendMessage("Error desconocido");
          setIsTokenValid(false);
        }
      } finally {
        setIsLoading(false);
        setHasFetched(true);
      }
    };

    if (show) {
      validateToken();
    }
  }, [show, token, internalRequest]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { password: "", repite_password: "" } });

  const { mutate } = useMutation({
    mutationFn: reestablecerPassword,
    onError: (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    },
    onSuccess: (data) => {
      Swal.fire({
        title: data,
        icon: "success",
        draggable: true,
      });
      reset();
      navigate(location.pathname, { replace: true });
    },
  });

  const handleForm = ({
    password,
    repite_password,
  }: {
    password: string;
    repite_password: string;
  }) => {
    if (password !== repite_password) {
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
      });
      return;
    }

    if (token) {
      mutate({ token, password });
    } else if (!token && accessToken) {
      mutate({ token: accessToken, password });
    } else {
      Swal.fire({
        icon: "error",
        title: "Token no válido",
      });
    }
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            navigate(location.pathname, { replace: true });
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
                <DialogPanel className="w-full max-w-xl p-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl text-slate-800">
                  <DialogTitle
                    as="h3"
                    className="mb-4 text-xl font-semibold underline sm:text-3xl underline-offset-4 decoration-2"
                  >
                    {isLoading || backendMessage ? "" : "Reestablecer contraseña"}
                  </DialogTitle>

                  {isLoading ? (
                    <div className="flex items-center justify-center mt-5">
                      <ClipLoader color="#36d7b7" size={80} />
                    </div>
                  ) : hasFetched && isTokenValid ? (
                    <form
                      className="flex flex-col max-w-md"
                      noValidate
                      onSubmit={handleSubmit(handleForm)}
                    >
                      {token && (
                        <p className="my-2 text-xs italic font-thin text-primaryGreen">
                          *Esta ventana es de un solo uso. Te recomendamos cambiar tu contraseña
                          antes de salir. De lo contrario, deberás solicitar un nuevo link de
                          recuperación.
                        </p>
                      )}

                      <NewPasswordForm register={register} errors={errors} />

                      <input
                        type="submit"
                        value="Enviar"
                        className="w-1/2 py-1 my-3 text-base text-white uppercase transition-colors rounded shadow-lg cursor-pointer bg-primaryGreen sm:p-2 hover:bg-greenHover"
                      />
                    </form>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
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
