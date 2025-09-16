import React, { useEffect, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import ActionButton from "@/frontend-resourses/components/Buttons/ActionButton";
import showAlert from "@/frontend-resourses/utils/showAlert";
import { useUsuariosProfStore } from "../store/usuariosProfStore";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { grabarUsuarioProf } from "../service/UsuariosProfService";

type FormData = {
  usuario: string;
  nombre: string;
  tusuario: string;
  tipo: string;
  iddoctor?: string;
  doctor: string;
  password: string;
};

// type FieldName = "nombre" | "tipo" | "doctor" | "password" | "confirmPassword";

interface Field {
  name: string;
  label: string;
  type: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>;
  options?: { value: string; label: string }[];
}

interface UsuariosProfFormProps {
  usuario?: any;
  doctores?: any;
  onEndAlta?: () => void;
  modoEdicion?: boolean;
  alta?: boolean;
}

export default function UsuariosProfForm({ usuario, doctores, onEndAlta }: UsuariosProfFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { editMode, setEditMode, setSelectEnabled, setEnabledFetchUsu } = useUsuariosProfStore();

  const { register, handleSubmit, reset, formState } = useForm<FormData>({
    defaultValues: {
      usuario: usuario?.usuario,
      nombre: usuario?.nusuario,
      tusuario: usuario?.tusuario,
      tipo: usuario?.tusuario?.toString() ?? "",
      iddoctor: usuario?.iddoctor,
      doctor: usuario?.iddoctor,
      password: usuario?.passprof,
    },
  });

  console.log(usuario);

  const doctorOptions = [{ value: "" as const, label: "" }];

  if (doctores) {
    doctorOptions.push(
      ...doctores.map((doc: any) => ({ value: doc.iddoctor, label: doc.ndoctor })),
    );
  }

  const camposForm: Field[] = [
    {
      name: "usuario",
      label: "Usuario",
      type: "text",
      inputProps: {
        className:
          "max-w-40 px-2 text-base font-medium border rounded outline-none " +
          (!editMode
            ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white border-gray-300 text-gray-700"),
        id: "usuario",
        disabled: !editMode,
      },
    },
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      inputProps: {
        className:
          "max-w-40 px-2 text-base font-medium border rounded outline-none " +
          (!editMode
            ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white border-gray-300 text-gray-700"),
        id: "nombre",
        disabled: !editMode,
      },
    },
    {
      name: "tipo",
      label: "Tipo",
      type: "select",
      inputProps: {
        className:
          "max-w-52 px-2 text-base font-medium border rounded outline-none " +
          (!editMode
            ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white border-gray-300 text-gray-700"),
        id: "tipo",
        disabled: !editMode,
      },
      options: [
        { value: "", label: "" },
        { value: "1", label: "Doctor" },
        { value: "2", label: "Secretaria" },
        { value: "3", label: "Odontología" },
        { value: "4", label: "Gerente" },
      ],
    },
    {
      name: "doctor",
      label: "Doctor",
      type: "select",
      inputProps: {
        className:
          "max-w-52 px-2 text-base font-medium border rounded outline-none " +
          (!editMode
            ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white border-gray-300 text-gray-700"),
        id: "doctor",
        disabled: !editMode,
      },
      options: doctorOptions,
    },
    {
      name: "password",
      label: "Contraseña",
      type: "password",
      inputProps: {
        className:
          "max-w-52 px-2 text-base font-medium border rounded outline-none " +
          (!editMode
            ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white border-gray-300 text-gray-700"),
        id: "password",
        disabled: !editMode,
      },
    },
  ];

  const mutation = useMutation({
    mutationFn: async (data: any) => await grabarUsuarioProf(data),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (_data) => {
      setEditMode(false);
      setSelectEnabled(true);
      setEnabledFetchUsu(true);
      if (onEndAlta) onEndAlta();
    },
  });

  useEffect(() => {
    if (usuario) {
      reset({
        usuario: usuario?.usuario ?? "",
        nombre: usuario?.nusuario ?? "",
        tusuario: usuario?.tusuario ?? "",
        tipo: usuario?.tusuario?.toString() ?? "",
        iddoctor: usuario?.iddoctor ?? "",
        doctor: usuario?.iddoctor ?? "",
        password: usuario?.passprof ?? "",
      });
    } else {
      reset({
        usuario: "",
        nombre: "",
        tusuario: "",
        tipo: "",
        iddoctor: "",
        doctor: "",
        password: "",
      });
    }
  }, [usuario, reset]);

  function onSubmit(data: any) {
    // console.log(data);
    const payload = {
      usuario: data.usuario,
      nusuario: data.nombre,
      tusuario: Number(data.tipo),
      iddoctor: data.doctor,
      password: data.password,
    };
    // console.log(data);
    // console.log(payload);
    mutation.mutate(payload);
  }

  // console.log(doctorOptions);

  return (
    <form className="flex flex-col w-[450px] gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full gap-y-10 bg-white p-4 border rounded shadow">
        <div className="flex flex-col gap-4 ">
          {camposForm.map((field) => {
            if (field.name === "doctor" && usuario?.tusuario === 2) return null;

            const isPasswordField = field.name === "password" || field.name === "confirmPassword";
            let inputType = field.type;

            if (field.name === "password" && showPassword) inputType = "text";

            return (
              <div key={field.name} className="flex items-end justify-start gap-2">
                <label
                  htmlFor={field.inputProps.id}
                  className="w-24 text-base text-right font-semibold text-gray-700 "
                >
                  {field.label}
                </label>
                {field.name === "usuario" ? (
                  <input
                    type="text"
                    {...field.inputProps}
                    {...register(field.name as keyof FormData)}
                  />
                ) : field.type === "select" ? (
                  <select {...field.inputProps} {...register(field.name as keyof FormData)}>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="relative flex items-center">
                    <input
                      type={inputType}
                      {...field.inputProps}
                      {...register(field.name as keyof FormData)}
                      style={{ paddingRight: isPasswordField ? 32 : undefined }}
                    />
                    {isPasswordField && (
                      <button
                        type="button"
                        tabIndex={-1}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-0 bg-transparent border-none cursor-pointer"
                        onMouseDown={() =>
                          field.name === "password" ? setShowPassword(true) : setShowConfirm(true)
                        }
                        onMouseUp={() =>
                          field.name === "password" ? setShowPassword(false) : setShowConfirm(false)
                        }
                        onMouseLeave={() =>
                          field.name === "password" ? setShowPassword(false) : setShowConfirm(false)
                        }
                      >
                        {(field.name === "password" && showPassword) ||
                        (field.name === "confirmPassword" && showConfirm) ? (
                          <LuEye size={17} className="text-gray-400" />
                        ) : (
                          <LuEyeClosed size={17} className="text-gray-400" />
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-4">
        <ActionButton
          type="button"
          text="Confirmar"
          custom
          customColor="#4F8EF7"
          customColorHover="#2563eb"
          size="sm"
          addClassName="w-full"
          disabled={!formState.isDirty}
          onClick={handleSubmit(onSubmit)}
        />

        <ActionButton
          type="button"
          text="Cancelar"
          color={`${editMode ? "red" : ""}`}
          size="sm"
          addClassName="w-full"
          onClick={async () => {
            if (formState.isDirty) {
              const result = await showAlert({
                icon: "warning",
                text: "Hay cambios sin guardar. ¿Seguro que quieres cancelar?",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Sí, Cancelar",
                cancelButtonText: "No",
              });
              if (result.isConfirmed) {
                setEditMode(false);
                setSelectEnabled(true);
                reset();
                if (onEndAlta) onEndAlta();
              }
            } else {
              setEditMode(false);
              setSelectEnabled(true);
              reset();
              if (onEndAlta) onEndAlta();
            }
          }}
        />
      </div>
    </form>
  );
}
