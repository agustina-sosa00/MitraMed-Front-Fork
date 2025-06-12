import { useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  Controller,
  Control,
} from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { NewAccount } from "@/types/index";
import Select from "react-select";
import ErrorMessage from "../../ui/ErrorMessage";
import InputField from "../../ui/InputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

type RegisterFormProps = {
  register: UseFormRegister<NewAccount>;
  errors: FieldErrors<NewAccount>;
  watch: UseFormWatch<NewAccount>;
  control: Control<NewAccount>;
  formGoogle?: boolean;
  faltantes?: string[];
};

interface OptionType {
  value: string;
  label: string;
}

export default function RegisterForm({
  register,
  errors,
  watch,
  control,
  formGoogle,
  faltantes,
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const generoOptions: OptionType[] = [
    { value: "Masculino", label: "Masculino" },
    { value: "Femenino", label: "Femenino" },
  ];

  const fieldsRender = (field: string) =>
    !faltantes || faltantes.includes(field);

  return (
    <>
      <div className="flex flex-col w-full ">
        <div className="flex flex-col justify-center w-full gap-3 md:mr-12">
          {fieldsRender("nombre") && (
            <div className="flex flex-col">
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
            <div className="flex flex-col">
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

          {fieldsRender("fnac") && (
            <div className="flex flex-col">
              <label
                htmlFor="fnac"
                className="p-1 font-semibold text-gray-700 sm:text-lg xl:text-2xl"
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
                render={({ field }) => (
                  <DatePicker
                    id="fnac"
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => {
                      field.onChange(date); // Asegura que se registre el valor de 'DatePicker' en react-hook-form
                    }}
                    onChangeRaw={(e) => {
                      if (e) e.preventDefault(); // Asegura que 'e' no sea undefined
                    }}
                    placeholderText="Selecciona tu fecha de nacimiento"
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={100}
                    className="w-full max-w-2xl px-2 py-1 font-semibold transition duration-200 bg-white border outline-none cursor-pointer sm:p-2 xl:p-3 xl:mt-2 xl:text-lg border-opacity-40 border-slate-500 focus:ring-1 placeholder:text-sm xl:placeholder:text-lg placeholder:text-gray-300 placeholder:font-medium"
                    onKeyDown={(e) => {
                      if (e) e.preventDefault(); // Asegura que 'e' no sea undefined
                    }}
                    showIcon
                    toggleCalendarOnIconClick
                    icon={
                      <FaCalendarAlt
                        className={`invisible small:visible absolute right-1 top-1/2 transform -translate-y-1/2 text-sm cursor-pointer text-gray-500`}
                      />
                    }
                  />
                )}
              />
              {errors.fnac && (
                <ErrorMessage>{errors.fnac.message}</ErrorMessage>
              )}
            </div>
          )}

          {fieldsRender("genero") && (
            <div className="flex flex-col mb-1">
              <label htmlFor="genero" className="p-1 text-lg font-semibold">
                Sexo:
              </label>
              <Controller
                name="genero"
                control={control}
                rules={{ required: "El sexo es obligatorio" }}
                render={({ field }) => (
                  <Select<OptionType>
                    {...field}
                    options={generoOptions}
                    value={generoOptions.find(
                      (option) => option.value === field.value
                    )}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value)
                    } // Guardar solo el valor
                    placeholder="Selecciona un género"
                    isClearable
                    isSearchable={false}
                    className="w-full text-sm font-semibold transition duration-200 bg-blue-200 rounded-none outline-none border-1 sm:text-base border-slate-300 focus:ring-1"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        borderRadius: "0",
                        "&:focus": {
                          borderColor: "#60a5fa",
                          boxShadow: "0 0 0 1px rgba(124, 191, 255, 0.5)",
                        },
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: "#d1d5db",
                        fontWeight: "500",
                      }),
                    }}
                  />
                )}
              />

              {errors.genero && (
                <ErrorMessage>{errors.genero.message}</ErrorMessage>
              )}
            </div>
          )}

          {fieldsRender("email") && (
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
                  setValueAs: (value) => value.trim(),
                })}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>
          )}

          {(fieldsRender("codarea") || fieldsRender("teléfono")) && (
            <div className="flex flex-col gap-1 mb-2">
              <p className="mt-2 font-semibold text-gray-700 sm:text-lg">
                Teléfono
              </p>
              <div className="flex items-center w-full gap-7">
                <div className="flex flex-col w-1/6">
                  <input
                    id="codarea"
                    type="text"
                    placeholder={"Cod. Área"}
                    className={`w-full px-2 py-1 sm:p-2 max-w-2xl font-semibold bg-white border border-opacity-40 border-slate-500 outline-none transition duration-200 focus:ring-1 placeholder:text-sm placeholder:text-gray-300 placeholder:font-medium`}
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
                          const telefono = watch("tel") || "";
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
                <p className="font-semibold text-gray-400">15</p>
                <div className="flex flex-col w-3/4">
                  <input
                    id="tel"
                    type="text"
                    placeholder={"Ingresa tu número de teléfono"}
                    className={`w-full px-2 py-1 sm:p-2 max-w-2xl font-semibold bg-white border border-opacity-40 border-slate-500 outline-none transition duration-200 focus:ring-1 placeholder:text-sm placeholder:text-gray-300 placeholder:font-medium`}
                    {...register("tel", {
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
              {errors.tel && <ErrorMessage>{errors.tel.message}</ErrorMessage>}
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
              <button
                type="button"
                className="absolute text-xl right-3 top-12"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>
            <div className="relative flex flex-col ">
              <InputField
                id={"confirmPassword"}
                type={showPassword ? "text" : "password"}
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
              <button
                type="button"
                className="absolute text-xl right-3 top-12"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>
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
