import { useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  Controller,
  Control,
} from "react-hook-form";
import { NewAccount } from "@/types/index";
import ErrorMessage from "../../ui/ErrorMessage";
import InputField from "../../ui/InputField";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { FaCalendarAlt } from "react-icons/fa";
import { SelectBirthdayDiv } from "@/components/ui/SelectBirthday";
import { Select } from "@/components/ui/Select";

type RegisterFormProps = {
  register: UseFormRegister<NewAccount>;
  errors: FieldErrors<NewAccount>;
  watch: UseFormWatch<NewAccount>;
  control: Control<NewAccount>;
  formGoogle?: boolean;
  faltantes?: string[];
};

export default function RegisterForm({
  register,
  errors,
  watch,
  control,
  formGoogle,
  faltantes,
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const fieldsRender = (field: string) =>
    !faltantes || faltantes.includes(field);

  return (
    <>
      <div className="flex flex-col w-full ">
        <div className="flex flex-col justify-center w-full md:mr-12">
          <div className="flex flex-col items-center justify-between w-full gap-1 lg:flex-row">
            {fieldsRender("nombre") && (
              <div className="flex flex-col w-full">
                <InputField
                  id={"nombre"}
                  type={"text"}
                  label={"Nombre"}
                  placeholder={"Ingresa tu nombre"}
                  register={register("nombre", {
                    required: {
                      value: true,
                      message: "El nombre es obligatorio",
                    },
                    setValueAs: (value) => value.trim(),
                  })}
                />
                {errors.nombre && (
                  <ErrorMessage>{errors.nombre.message}</ErrorMessage>
                )}
              </div>
            )}
            {fieldsRender("apellido") && (
              <div className="flex flex-col w-full">
                <InputField
                  id={"apellido"}
                  type={"text"}
                  label={"Apellido"}
                  placeholder={"Ingresa tu apellido"}
                  register={register("apellido", {
                    required: {
                      value: true,
                      message: "El apellido es obligatorio",
                    },
                    setValueAs: (value) => value.trim(),
                  })}
                />
                {errors.apellido && (
                  <ErrorMessage>{errors.apellido.message}</ErrorMessage>
                )}
              </div>
            )}
          </div>

          {fieldsRender("fnac") && (
            <div className="flex flex-col py-1">
              <label
                htmlFor="fnac"
                className="text-base font-semibold text-gray-700 "
              >
                Fecha de Nacimiento
              </label>
              <Controller
                name="fnac"
                control={control} // 'control' es proporcionado por el hook useForm
                rules={{
                  required: {
                    value: true,
                    message: "La fecha de nacimiento es obligatoria",
                  },
                  validate: (value) => {
                    const fechaNacimiento = new Date(value);
                    const fechaActual = new Date();
                    const edad =
                      fechaActual.getFullYear() - fechaNacimiento.getFullYear();

                    if (edad < 18) {
                      return "Debes ser mayor de edad para registrarte";
                    }
                    return true; // Si la edad es mayor o igual a 18, es válido
                  },
                }}
                render={({ field }) => <SelectBirthdayDiv field={field} />}
              />

              {errors.fnac && (
                <ErrorMessage>{errors.fnac.message}</ErrorMessage>
              )}
            </div>
          )}

          <div className="flex flex-col items-center justify-between w-full gap-1 lg:flex-row">
            {fieldsRender("genero") && (
              <div className="flex flex-col w-full mb-1 ">
                <Controller
                  name="genero"
                  control={control}
                  rules={{ required: "El sexo es obligatorio" }}
                  render={({ field }) => (
                    <Select
                      field={field}
                      label="Sexo: "
                      placeholder="Selecciona un género"
                      options={["Masculino", "Femenino"]}
                    />
                  )}
                />

                {errors.genero && (
                  <ErrorMessage>{errors.genero.message}</ErrorMessage>
                )}
              </div>
            )}
            {fieldsRender("email") && (
              <div className="flex flex-col w-full">
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
                    setValueAs: (value) => value.trim(),
                  })}
                />
                {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
              </div>
            )}
          </div>

          {(fieldsRender("codarea") || fieldsRender("teléfono")) && (
            <div className="flex flex-col gap-1 mb-2">
              <p className="mt-2 text-base font-semibold text-gray-700">
                Teléfono
              </p>
              <div className="flex items-center w-full gap-3">
                <div className="flex flex-col w-1/5">
                  <input
                    id="codarea"
                    type="text"
                    placeholder={"Cod. Área"}
                    className={`w-full px-2 py-1 text-sm max-w-2xl font-semibold  bg-white border border-opacity-40 border-slate-500 outline-none transition duration-200 focus:ring-1 placeholder:text-sm placeholder:text-gray-300 placeholder:font-medium`}
                    {...register("codarea", {
                      required: {
                        value: true,
                        message: "El código de área es obligatorio",
                      },
                      pattern: {
                        value: /^[0-9]{2,4}$/,
                        message: "Código inválido",
                      },
                      validate: {
                        suma10: (value) => {
                          const telefono = watch("telefono") || "";
                          const totalDigitos =
                            value.trim().length + telefono.trim().length;
                          return (
                            totalDigitos === 10 ||
                            "El código de área y teléfono deben sumar 10 dígitos"
                          );
                        },
                      },
                    })}
                  />
                </div>
                <p className="text-sm font-semibold text-gray-400">15</p>
                <div className="flex flex-col w-3/4">
                  <input
                    id="tel"
                    type="text"
                    placeholder={"Ingresa tu número de teléfono"}
                    className={`w-full px-2 py-1 text-sm max-w-2xl font-semibold bg-white border border-opacity-40 border-slate-500 outline-none transition duration-200 focus:ring-1  placeholder:text-sm placeholder:text-gray-300 placeholder:font-medium`}
                    {...register("telefono", {
                      required: {
                        value: true,
                        message: "El número de teléfono es obligatorio",
                      },
                      pattern: {
                        value: /^[0-9]{6,10}$/,
                        message: "Número inválido",
                      },
                      validate: {
                        suma10: (value) => {
                          const codarea = watch("codarea") || "";
                          const totalDigitos =
                            value.trim().length + codarea.trim().length;
                          return (
                            totalDigitos === 10 ||
                            "El código de área y teléfono deben sumar 10 dígitos"
                          );
                        },
                      },
                    })}
                  />
                </div>
              </div>
              {errors.codarea && (
                <ErrorMessage>{errors.codarea.message}</ErrorMessage>
              )}
              {errors.telefono && (
                <ErrorMessage>{errors.telefono.message}</ErrorMessage>
              )}
            </div>
          )}
        </div>

        {!formGoogle ? (
          <>
            {" "}
            <div className="relative flex flex-col">
              <InputField
                id={"password"}
                type={showPassword ? "text" : "password"}
                setShow={setShowPassword}
                show={showPassword}
                label={"Contraseña"}
                placeholder={"Ingresa tu contraseña"}
                register={register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es obligatoria",
                  },
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener mínimo 8 carácteres",
                  },
                })}
              />

              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>
            <div className="relative flex flex-col ">
              <InputField
                id={"confirmPassword"}
                type={showPassword ? "text" : "password"}
                setShow={setShowPassword}
                show={showPassword}
                label={"Confirmar Contraseña"}
                placeholder={"Ingresa nuevamente tu contraseña"}
                register={register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirmar la contraseña es obligatorio",
                  },
                  validate: (value) =>
                    value === watch("password") ||
                    "Las contraseñas deben ser idénticas",
                })}
              />

              {errors.confirmPassword && (
                <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
              )}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
