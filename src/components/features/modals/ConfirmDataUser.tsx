import { Modal } from "@/components/ui/Modal";
import { NewAccount } from "@/types/index";
import { DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RegisterForm from "../forms/RegisterForm";

export const ConfirmDataUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dataFromBack = location.state?.dataBack;
  const faltantes = dataFromBack;
  const dataFromGoogle = location.state?.dataGoogle;
  console.log("data del  back", dataFromBack);
  console.log("data del  google", dataFromGoogle);
  const queryParams = new URLSearchParams(location.search);

  const modal = queryParams.get("confirmDataUser");
  const show = modal ? true : false;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<NewAccount>({
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      fnac: "",
      codarea: "",
      tel: "",
      genero: "",
      password: "",
      confirmPassword: "",
    },
  });
  const handleOnSubmit = (data: NewAccount) => {
    toast.success("Datos confirmados");
    console.log(data);
    // navigate("/");
  };
  return (
    <Modal
      onClose={() => {
        navigate("/");
      }}
      open={!!show}
    >
      <DialogTitle
        as="h3"
        className="mb-6 text-3xl font-semibold text-center text-green"
      >
        Confirma tus datos
      </DialogTitle>
      <p className="mb-6 text-sm text-center text-blue">
        Para completar el proceso de autenticación, por favor complete los datos
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
    </Modal>
  );
};
