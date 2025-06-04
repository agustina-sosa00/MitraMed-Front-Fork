import { useForm } from "react-hook-form";
import { DialogTitle } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { NewAccount } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { crearCuenta } from "@/services/UserService";
import { toast } from "react-toastify";
import RegisterForm from "../forms/RegisterForm";
import { Modal } from "@/components/ui/Modal";

export default function CreateAccountModal() {
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
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: crearCuenta,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/");
      reset();
    },
  });

  const handleForm = (formData: NewAccount) => {
    const formattedDate = new Date(formData.fnac).toISOString().split("T")[0];
    const dataToSend = { ...formData, fnac: formattedDate };
    // console.log(dataToSend);
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
        <DialogTitle
          as="h3"
          className="mb-6 text-3xl font-semibold text-center text-gray-800 underline"
        >
          Crea tu cuenta
        </DialogTitle>

        <p className="mb-6 text-sm text-center text-gray-600">
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
            />
            <input
              type="submit"
              value="Registrarme"
              className="max-w-lg p-2 my-3 text-base text-white uppercase transition-colors bg-[var(--color-green)] rounded shadow-lg cursor-pointer hover:bg-[var(--color-green-hover)] "
            />
          </div>
        </form>

        <div className="flex flex-col items-start gap-2 mx-2 my-3">
          <p className="">
            Ya tienes una cuenta?{" "}
            <button
              className="text-[var(--color-green)] hover:underline"
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
