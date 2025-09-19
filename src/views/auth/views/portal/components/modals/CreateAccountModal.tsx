import { useForm } from "react-hook-form";
import { DialogTitle } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { crearCuenta } from "@/views/auth/services/UserService";
import { Modal } from "@/views/auth/_components/ui/Modal";
import Swal from "sweetalert2";
import Captcha from "@/views/auth/_components/ui/Captcha";
import { useState } from "react";
import { NewAccount } from "@/views/auth/types";
import RegisterForm from "../forms/RegisterForm";

export default function CreateAccountModal() {
  const [validateCaptcha, setValidateCaptcha] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modal = queryParams.get("createAccount");
  const show = modal ? true : false;

  const initialValues: NewAccount = {
    nombre: "",
    apellido: "",
    email: "",
    fnac: "",
    codarea: "",
    telefono: "",
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
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: crearCuenta,
    onError: (error) => {
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
      navigate("/");
      reset();
    },
  });

  const handleForm = (formData: NewAccount) => {
    const formattedDate = new Date(formData.fnac).toISOString().split("T")[0];
    const dataToSend = { ...formData, fnac: formattedDate };
    mutate(dataToSend);
  };

  return (
    <>
      <Modal
        onClose={() => {
          navigate("/");
          reset();
        }}
        open={show}
      >
        <DialogTitle as="h3" className="text-3xl font-semibold text-center text-green">
          Crea tu cuenta
        </DialogTitle>

        <p className="py-2 text-sm text-center text-blue">
          Llena el formulario para registrarte y recibirás un correo para confirmar tu cuenta.
        </p>

        <form className="py-2" noValidate onSubmit={handleSubmit(handleForm)}>
          <div className="flex flex-col gap-4 px-10">
            <RegisterForm register={register} errors={errors} watch={watch} control={control} />
            <div className="flex justify-center w-full">
              <Captcha setState={setValidateCaptcha} />
            </div>
            <input
              disabled={!validateCaptcha}
              type="submit"
              value="Registrarme"
              className={`w-full p-2 mt-4 text-base font-semibold uppercase transition-all rounded-lg shadow-md cursor-pointer xl:p-3 xl:text-lg  ${
                !validateCaptcha
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-green hover:bg-greenHover text-white"
              }`}
            />
          </div>
        </form>

        <div className="flex flex-col items-start gap-2 mx-2 ">
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
