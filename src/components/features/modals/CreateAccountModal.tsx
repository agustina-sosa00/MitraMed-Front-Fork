import { useForm } from "react-hook-form";
import { DialogTitle } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { NewAccount, UserGoogle } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { crearCuenta, googleAuth } from "@/services/UserService";
import { toast } from "react-toastify";
import RegisterForm from "../forms/RegisterForm";
import { Modal } from "@/components/ui/Modal";
import { useEffect, useMemo } from "react";
import Cookies from "js-cookie";
type DatosGoogleCompletos = Partial<NewAccount> & Pick<UserGoogle, "idToken">;
export default function CreateAccountModal() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modal = queryParams.get("createAccount");

  const token = Cookies.get("accessToken"); // o localStorage.getItem("accessToken")
  const datosGoogle = location.state as DatosGoogleCompletos | null;

  const show = useMemo(() => modal && !token, [modal, token]);

  useEffect(() => {
    if (token) {
      navigate("/inicio");
    }
  }, [token, navigate]);

  const defaultValues: NewAccount = {
    nombre: datosGoogle?.nombre || "",
    apellido: datosGoogle?.apellido || "",
    email: datosGoogle?.email || "",
    fnac: "",
    codarea: "",
    tel: "",
    genero: "",
    password: "",
    confirmPassword: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm<NewAccount>({ defaultValues });
  useEffect(() => {
    if (datosGoogle) {
      reset({
        nombre: datosGoogle.nombre || "",
        apellido: datosGoogle.apellido || "",
        email: datosGoogle.email || "",
        fnac: "",
        codarea: "",
        tel: "",
        genero: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [datosGoogle, reset]);

  const crearCuentaMutation = useMutation({
    mutationFn: crearCuenta,
    onSuccess: (data) => {
      Cookies.set("accessToken", data.token_acceso, { expires: 0.3333 });
      Cookies.set("refreshToken", data.token_refresh, { expires: 0.5 });
      navigate("/inicio");
    },
    onError: (error) => toast.error(error.message),
  });

  const googleAuthMutation = useMutation({
    mutationFn: googleAuth,
    onSuccess: (data) => {
      Cookies.set("accessToken", data.token_acceso, { expires: 0.3333 });
      Cookies.set("refreshToken", data.token_refresh, { expires: 0.5 });
      navigate("/inicio");
    },
    onError: (error) => toast.error(error.message),
  });

  const handleForm = (formData: NewAccount) => {
    if (datosGoogle?.idToken) {
      googleAuthMutation.mutate({
        idToken: datosGoogle.idToken,
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        fnac: formData.fnac,
        genero: formData.genero,
      });
    } else {
      const formattedDate = new Date(formData.fnac).toISOString().split("T")[0];
      crearCuentaMutation.mutate({ ...formData, fnac: formattedDate });
    }
  };

  return (
    <>
      <Modal
        onClose={() => {
          navigate("/");
          reset();
        }}
        open={!!show}
      >
        <DialogTitle
          as="h3"
          className="mb-6 text-3xl font-semibold text-center text-green"
        >
          Crea tu cuenta
        </DialogTitle>

        <p className="mb-6 text-sm text-center text-blue">
          Llena el formulario para registrarte y recibirás un correo para
          confirmar tu cuenta.
        </p>

        <form className="mt-5" noValidate onSubmit={handleSubmit(handleForm)}>
          <div className="flex flex-col gap-4">
            <RegisterForm
              register={register}
              errors={errors}
              watch={watch}
              control={control}
              datosGoogle={datosGoogle ?? undefined}
            />
            <input
              type="submit"
              value="Registrarme"
              className="max-w-lg px-4 py-1 my-3 text-base text-white uppercase transition-colors rounded shadow-lg cursor-pointer bg-green hover:bg-greenHover "
            />
          </div>
        </form>

        <div className="flex flex-col items-start gap-2 mx-2 my-3">
          <p className="">
            Ya tienes una cuenta?{" "}
            <button
              className="text-green hover:text-greenHover hover:underline"
              onClick={() => navigate("/")}
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </Modal>
    </>
  );
}
