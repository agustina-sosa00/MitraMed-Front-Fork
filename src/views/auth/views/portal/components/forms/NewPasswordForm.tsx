import ErrorMessage from "@/views/auth/_components/ui/ErrorMessage";
import InputField from "@/views/auth/_components/ui/InputField";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface NewPasswordFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export default function NewPasswordForm({ register, errors }: NewPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleSetShow = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="relative flex flex-col max-w-md">
        <InputField
          id={"password"}
          type={showPassword ? "text" : "password"}
          label={"Nueva contraseña"}
          setShow={handleSetShow}
          placeholder={"Ingresa nueva contraseña"}
          register={register("password", {
            required: {
              value: true,
              message: "La nueva contraseña es obligatoria",
            },
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
        />

        {errors.password && typeof errors.password.message === "string" && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>
      <div className="relative flex flex-col max-w-md">
        <InputField
          id={"repite_password"}
          type={showPassword ? "text" : "password"}
          label={"Repite tu contraseña"}
          setShow={handleSetShow}
          placeholder={"Ingresa nuevamente tu contraseña"}
          register={register("repite_password", {
            required: {
              value: true,
              message: "Debes repetir tu contraseña",
            },
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
        />

        {errors.repite_password && typeof errors.repite_password.message === "string" && (
          <ErrorMessage>{errors.repite_password.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
