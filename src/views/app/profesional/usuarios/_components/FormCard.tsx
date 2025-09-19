import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { ActionButton } from "@/frontend-resourses/components";
import { grabarUsuarioProf } from "../service/usuariosProfService";
import { useUsuariosProfesionalStore } from "../store/usuariosProfesionalesStore";
import showAlert from "@/frontend-resourses/utils/showAlert";

interface FormData {
  usuario: string;
  nusuario: string;
  tusuario: number | null;
  iddoctor: number | null;
  password: string;
}

interface FormField {
  id: keyof FormData;
  label: string;
  type: "text" | "password" | "select";
  maxWidth: string;
  options?: { value: string | number | null; label: string }[];
  disabledInEdit?: boolean;
}

type FormCardProps = {
  usuarioSeleccionado?: any;
  dataDoctores: any[];

  consulta?: boolean;
  edicion?: boolean;
  alta?: boolean;

  // Setters para cambiar los modos
  setConsulta?: (value: boolean) => void;
  setEdicion?: (value: boolean) => void;
  setAlta?: (value: boolean) => void;

  // Funciones para el modal de alta
  onCloseModal?: () => void;
  onSuccessModal?: () => void;
};

export default function FormCard({
  dataDoctores,
  usuarioSeleccionado,
  consulta,
  edicion,
  setConsulta,
  setEdicion,
  onCloseModal,
  onSuccessModal,
}: FormCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const skipAutoFocus = useRef(false);
  const customColor = "#518915";
  const customColorHover = "#3d6610";

  const defaultValues = {
    usuario: usuarioSeleccionado?.usuario || "",
    nusuario: usuarioSeleccionado?.nusuario || "",
    tusuario: usuarioSeleccionado?.tusuario || null,
    iddoctor: usuarioSeleccionado?.iddoctor || null,
    password: usuarioSeleccionado?.passprof || "",
  };

  const { triggerRefetchUsuarios, alta, setAlta } = useUsuariosProfesionalStore();
  const { register, reset, getValues, watch } = useForm<FormData>({ defaultValues });

  // Observar cambios en tiempo real
  watch();
  const tusuarioValue = watch("tusuario");
  // Se recalcula cada vez que cambian los valores del formulario
  const hayCambiosGrabar = detectaCambiosForm();

  const inputsForm: FormField[] = [
    {
      id: "usuario",
      label: "Usuario",
      type: "text",
      maxWidth: "max-w-40",
    },
    {
      id: "nusuario",
      label: "Nombre",
      type: "text",
      maxWidth: "max-w-40",
    },
    {
      id: "tusuario",
      label: "Tipo",
      type: "select",
      maxWidth: "max-w-52",
      options: [
        { value: null, label: " " },
        { value: 1, label: "Doctor" },
        { value: 2, label: "Secretaria" },
        { value: 3, label: "Odontología" },
        { value: 4, label: "Gerente" },
      ],
    },
    {
      id: "iddoctor",
      label: "Doctor",
      type: "select",
      maxWidth: "max-w-52",
      options: [
        { value: null, label: " " },
        ...dataDoctores.map((doctor) => ({
          value: doctor.iddoctor,
          label: doctor.ndoctor,
        })),
      ],
    },
    {
      id: "password",
      label: "Contraseña",
      type: "password",
      maxWidth: "max-w-52",
    },
  ];

  const { mutate: grabarUsuario } = useMutation({
    mutationFn: async (data: any) => await grabarUsuarioProf(data),
    onError: (error: any) => {
      console.error(error);

      // Verificar si es un error de usuario duplicado
      if (error.message && error.message.startsWith("DUPLICATE_USER:")) {
        const usuarioDuplicado = error.message.split(":")[1];

        // Marcar el campo usuario con error (borde rojo)
        setFieldErrors({ usuario: "Usuario ya existe" });

        // Evitar que el useEffect de alta interfiera
        skipAutoFocus.current = true;

        showAlert({
          icon: "error",
          title: "Usuario ya existe",
          text: `El usuario "${usuarioDuplicado}" ya existe. Elija otro nombre de usuario.`,
          showConfirmButton: true,
          confirmButtonText: "Entendido",
          confirmButtonColor: "#518915",
        }).then(() => {
          // Usar setTimeout más largo para evitar conflictos con re-renders
          setTimeout(() => {
            const usuarioField = document.getElementById("usuario") as HTMLInputElement;
            if (usuarioField) {
              // Forzar el foco múltiples veces para asegurar que se mantenga
              usuarioField.focus();
              const length = usuarioField.value.length;
              usuarioField.setSelectionRange(length, length);

              // Segundo foco para asegurar persistencia
              setTimeout(() => {
                if (document.activeElement !== usuarioField) {
                  usuarioField.focus();
                  usuarioField.setSelectionRange(length, length);
                }
              }, 50);
            }
          }, 300);
        });
      } else {
        // Error genérico
        showAlert({
          icon: "error",
          title: "Error al grabar",
          text: "Ocurrió un error al intentar grabar los datos. Intente nuevamente.",
          showConfirmButton: true,
        });
      }
    },
    onSuccess: () => {
      showAlert({
        icon: "success",
        text: "Cambios grabados",
        timer: 1000,
        showConfirmButton: false,
      });

      triggerRefetchUsuarios?.();

      if (alta && onSuccessModal) {
        onSuccessModal();
        onCloseModal?.();
      } else {
        volverAConsulta();
      }
    },
  });

  useEffect(() => {
    if (usuarioSeleccionado) {
      const newValues = {
        usuario: usuarioSeleccionado.usuario || "",
        nusuario: usuarioSeleccionado.nusuario || "",
        tusuario: usuarioSeleccionado.tusuario || null,
        iddoctor: usuarioSeleccionado.iddoctor || null,
        password: usuarioSeleccionado.passprof || "",
      };
      reset(newValues);
    } else {
      // Limpiar formulario cuando no hay usuario seleccionado
      reset({
        usuario: "",
        nusuario: "",
        tusuario: null,
        iddoctor: null,
        password: "",
      });
    }
  }, [usuarioSeleccionado, reset]);

  useEffect(() => {
    if (edicion) {
      const nombreField = document.getElementById("nusuario");
      if (nombreField) {
        nombreField.focus();
      }
    }
  }, [edicion]);

  useEffect(() => {
    if (alta && !skipAutoFocus.current) {
      setTimeout(() => {
        const usuarioField = document.getElementById("usuario");
        if (usuarioField) {
          usuarioField.focus();
        }
      }, 100);
    }
    // Reset the flag after use
    if (skipAutoFocus.current) {
      skipAutoFocus.current = false;
    }
  }, [alta]);

  // Limpiar iddoctor cuando tusuario es null o 2 en modo edición
  useEffect(() => {
    if (edicion && (!tusuarioValue || tusuarioValue == 2)) {
      const currentValues = getValues();
      reset({
        ...currentValues,
        iddoctor: null,
      });
    }
  }, [tusuarioValue, edicion, reset, getValues]);

  function detectaCambiosForm(): boolean {
    // En modo alta, cualquier valor en los campos cuenta como cambios
    if (alta) {
      const valoresActuales = getValues();
      return Object.values(valoresActuales).some(
        (valor) => valor !== null && valor !== undefined && valor !== "",
      );
    }

    // En modo edición/consulta, comparar con valores originales
    if (!usuarioSeleccionado) return false;

    const valoresActuales = getValues();
    const valoresOriginales = {
      usuario: usuarioSeleccionado.usuario || "",
      nusuario: usuarioSeleccionado.nusuario || "",
      tusuario: usuarioSeleccionado.tusuario || null,
      iddoctor: usuarioSeleccionado.iddoctor || null,
      password: usuarioSeleccionado.passprof || "",
    };

    const hayCambios = Object.keys(valoresActuales).some((key) => {
      const keyTyped = key as keyof FormData;
      let valorActual = valoresActuales[keyTyped];
      let valorOriginal = valoresOriginales[keyTyped];

      // Normalizar valores para comparación correcta
      if (key === "tusuario" || key === "iddoctor") {
        // Convertir strings a numbers para comparar, manejar valores vacíos como null
        valorActual =
          valorActual === "" || valorActual === null || valorActual === undefined
            ? null
            : Number(valorActual);
        valorOriginal =
          valorOriginal === "" || valorOriginal === null || valorOriginal === undefined
            ? null
            : Number(valorOriginal);
      }

      const cambio = valorActual !== valorOriginal;

      return cambio;
    });

    return hayCambios;
  }

  function volverAConsulta() {
    setConsulta?.(true);
    setEdicion?.(false);
    setAlta?.(false);
    setFieldErrors({});

    // Restaurar los valores originales del usuario seleccionado
    if (usuarioSeleccionado) {
      const valoresOriginales = {
        usuario: usuarioSeleccionado.usuario || "",
        nusuario: usuarioSeleccionado.nusuario || "",
        tusuario: usuarioSeleccionado.tusuario || null,
        iddoctor: usuarioSeleccionado.iddoctor || null,
        password: usuarioSeleccionado.passprof || "",
      };
      reset(valoresOriginales);
    }
  }

  function limpiarErrores(fieldId: string) {
    if (fieldErrors[fieldId]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent, fieldId: string) {
    if (e.key === "Enter") {
      e.preventDefault();

      // Obtener el orden dinámicamente del array inputsForm
      const fieldOrder = inputsForm.map((field) => field.id);
      const currentIndex = fieldOrder.indexOf(fieldId as keyof FormData);

      if (currentIndex < fieldOrder.length - 1) {
        const nextFieldId = fieldOrder[currentIndex + 1];
        const nextElement = document.getElementById(nextFieldId);
        if (nextElement) {
          nextElement.focus();
        }
      } else {
        // Último campo - solo disparar handleGrabar si hay cambios
        if (hayCambiosGrabar) {
          handleGrabar();
        }
        // Si no hay cambios, no hacer nada (mejor UX)
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      // Disparar handleCancelar en edición y alta
      if (edicion || alta) {
        handleCancelar();
      }
    }
  }

  function handleGrabar() {
    setFieldErrors({});

    const valoresActuales = getValues();

    const errores: { [key: string]: string } = {};

    // En modo alta, usuario es obligatorio
    if (alta && !valoresActuales.usuario?.trim()) errores.usuario = "Requerido";

    if (!valoresActuales.nusuario?.trim()) errores.nusuario = "Requerido";
    if (!valoresActuales.tusuario) errores.tusuario = "Requerido";

    // Solo validar iddoctor si tusuario NO es 2 (Secretaria)
    if (valoresActuales.tusuario && valoresActuales.tusuario != 2 && !valoresActuales.iddoctor) {
      errores.iddoctor = "Requerido";
    }

    if (!valoresActuales.password?.trim()) errores.password = "Requerido";

    if (Object.keys(errores).length > 0) {
      setFieldErrors(errores);

      // Enfocar el primer campo con error
      const primerCampoConError = Object.keys(errores)[0];
      const elemento = document.getElementById(primerCampoConError);
      if (elemento) {
        elemento.focus();
      }
      return;
    }

    const payload = {
      idprofesional: usuarioSeleccionado?.idprofesional,
      usuario: valoresActuales.usuario,
      nusuario: valoresActuales.nusuario,
      tusuario: valoresActuales.tusuario,
      iddoctor: valoresActuales.iddoctor,
      password: valoresActuales.password,
    };

    grabarUsuario(payload);
  }

  async function handleCancelar() {
    if (edicion || alta) {
      const hayCambiosCancelar = detectaCambiosForm();

      if (hayCambiosCancelar) {
        const result = await showAlert({
          icon: "warning",
          text: "Hay Cambios sin Guardar. ¿Seguro que quieres Cancelar?",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Sí",
          cancelButtonText: "No",
          confirmButtonColor: "#518915", // Verde
          cancelButtonColor: "#ef4444", // Rojo
        });
        if (!result.isConfirmed) {
          return;
        }
      }
    }

    if (alta && onCloseModal) {
      // En modo alta: cerrar modal
      onCloseModal();
    } else {
      // En modo edición: volver a consulta
      volverAConsulta();
    }
  }

  return (
    <div>
      <div className="flex flex-col w-96 p-4 mt-5 gap-y-3 bg-white border rounded shadow">
        {inputsForm.map((field) => (
          <div key={field.id} className="flex items-center gap-2">
            <label
              htmlFor={field.id}
              className="w-24 text-sm text-right font-semibold text-gray-500"
            >
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                id={field.id}
                {...register(field.id)}
                disabled={
                  consulta ||
                  (field.id === "iddoctor" &&
                    (() => {
                      const shouldDisable = !tusuarioValue || tusuarioValue == 2;

                      return shouldDisable;
                    })())
                }
                className={`px-2 text-sm font-medium border rounded focus:outline-none focus:ring-2 ${field.maxWidth} ${
                  fieldErrors[field.id]
                    ? "border-red-500 focus:ring-red-300 focus:border-red-500 bg-white text-gray-700"
                    : consulta ||
                        (field.id === "iddoctor" && (!tusuarioValue || tusuarioValue == 2))
                      ? "bg-gray-100 border-gray-200 text-gray-400 cursor-default focus:ring-blue-300 focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-700 focus:ring-blue-300 focus:border-blue-500"
                }`}
                onChange={(e) => {
                  limpiarErrores(field.id);
                  const registerProps = register(field.id);
                  if (registerProps.onChange) {
                    registerProps.onChange(e);
                  }
                }}
                onKeyDown={consulta ? undefined : (e) => handleKeyDown(e, field.id)}
              >
                {field.options?.map((option, index) => (
                  <option key={index} value={option.value ?? ""}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === "password" ? (
              <div className="relative flex items-center">
                <input
                  id={field.id}
                  {...register(field.id)}
                  type={showPassword ? "text" : "password"}
                  disabled={consulta}
                  className={`px-2 text-sm font-medium border rounded focus:outline-none focus:ring-2 ${field.maxWidth} ${
                    fieldErrors[field.id]
                      ? "border-red-500 focus:ring-red-300 focus:border-red-500 bg-white text-gray-700"
                      : consulta
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-default focus:ring-blue-300 focus:border-blue-500"
                        : "bg-white border-gray-300 text-gray-700 focus:ring-blue-300 focus:border-blue-500"
                  }`}
                  style={{ paddingRight: 32 }}
                  onChange={(e) => {
                    limpiarErrores(field.id);
                    const registerProps = register(field.id);
                    if (registerProps.onChange) {
                      registerProps.onChange(e);
                    }
                  }}
                  onKeyDown={consulta ? undefined : (e) => handleKeyDown(e, field.id)}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  disabled={consulta}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-0 bg-transparent border-none z-10 ${
                    consulta ? "cursor-default" : "cursor-pointer"
                  }`}
                  onMouseDown={consulta ? undefined : () => setShowPassword(true)}
                  onMouseUp={consulta ? undefined : () => setShowPassword(false)}
                  onMouseLeave={consulta ? undefined : () => setShowPassword(false)}
                >
                  {showPassword ? (
                    <LuEye size={17} className={consulta ? "text-gray-300" : "text-gray-400"} />
                  ) : (
                    <LuEyeClosed
                      size={17}
                      className={consulta ? "text-gray-300" : "text-gray-400"}
                    />
                  )}
                </button>
              </div>
            ) : (
              <input
                id={field.id}
                {...register(field.id)}
                type={field.type}
                disabled={consulta || (edicion && field.id === "usuario")}
                className={`px-2 text-sm font-medium border rounded focus:outline-none focus:ring-2 ${field.maxWidth} ${
                  fieldErrors[field.id]
                    ? "border-red-500 focus:ring-red-300 focus:border-red-500 bg-white text-gray-700"
                    : consulta || (edicion && field.id === "usuario")
                      ? "bg-gray-100 border-gray-200 text-gray-400 cursor-default focus:ring-blue-300 focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-700 focus:ring-blue-300 focus:border-blue-500"
                }`}
                onChange={(e) => {
                  limpiarErrores(field.id);
                  const registerProps = register(field.id);
                  if (registerProps.onChange) {
                    registerProps.onChange(e);
                  }
                }}
                onKeyDown={
                  consulta || (edicion && field.id === "usuario")
                    ? undefined
                    : (e) => handleKeyDown(e, field.id)
                }
              />
            )}
          </div>
        ))}
      </div>

      {/* Botones Grabar Cancelar */}
      <div className="flex gap-4 mt-5">
        <ActionButton
          type="button"
          text="Grabar"
          custom
          customColor={customColor}
          customColorHover={customColorHover}
          size="sm"
          addClassName="w-full"
          disabled={consulta || !hayCambiosGrabar}
          onClick={handleGrabar}
          tabIndex={fieldErrors.usuario ? -1 : 0} // Evitar foco cuando hay error en usuario
        />

        <ActionButton
          type="button"
          text="Cancelar"
          color={`red`}
          size="sm"
          addClassName="w-full"
          disabled={consulta}
          onClick={handleCancelar}
        />
      </div>
    </div>
  );
}
