import {
  actualizarEmail,
  actualizarTelefono,
  obtenerDatosUsuario,
} from "@/services/TurnosService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Usuario } from "@/types/index";
import { SlUser, SlUserFemale } from "react-icons/sl";

interface EmailTelefono {
  email: string;
  codarea: string;
  telefono: string;
}

export default function ConfigView() {
  const navigate = useNavigate();

  const [isEditingTelefono, setIsEditingTelefono] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState<string>("");
  const [codareaInput, setCodareaInput] = useState<string>("");
  const [telefonoInput, setTelefonoInput] = useState<string>("");
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  console.log("Codarea: ", codareaInput.trim());
  // console.log('Telefono: ', telefonoInput);

  const { register, setValue, handleSubmit } = useForm<EmailTelefono>({
    defaultValues: {
      email: "",
      codarea: "",
      telefono: "",
    },
  });

  const formatDate = (date: string) => {
    // Si el formato es DD-MM-YYYY, lo cambiamos a YYYY-MM-DD
    const parts = date.split("-");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    const d = new Date(formattedDate);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const { data: dataUsuario } = useQuery<Usuario[], Error>({
    queryKey: ["usuario"],
    queryFn: obtenerDatosUsuario,
    initialData: [],
    enabled: shouldRefetch,
  });

  // console.log(dataUsuario[0]);

  useEffect(() => {
    if (dataUsuario) {
      setUsuario(dataUsuario[0]);
      setShouldRefetch(false);
    }
  }, [dataUsuario]);

  useEffect(() => {
    if (usuario) {
      setValue("email", usuario.email);
      setValue("codarea", usuario.codarea);
      setValue("telefono", usuario.telefono);
    }
  }, [usuario, setValue]);

  const queryClient = useQueryClient();

  const { mutate: mutateEmail } = useMutation({
    mutationFn: (email: string) => actualizarEmail(email),
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
      setIsEditingEmail(false);
      if (usuario) {
        const updatedUsuario = { ...usuario, email: emailInput };
        setUsuario(updatedUsuario);
      }
      queryClient.invalidateQueries({ queryKey: ["usuario"] });

      queryClient.refetchQueries({ queryKey: ["usuario"] });
      setShouldRefetch(true);
    },
  });

  const { mutate: mutateTelefono } = useMutation({
    mutationFn: ({
      codarea,
      telefono,
    }: {
      codarea: string;
      telefono: string;
    }) => actualizarTelefono({ codarea, telefono }),
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
      setIsEditingTelefono(false);
      if (usuario) {
        const updatedUsuario = {
          ...usuario,
          codarea: codareaInput,
          telefono: telefonoInput,
        };
        setUsuario(updatedUsuario);
      }
      queryClient.invalidateQueries({ queryKey: ["usuario"] });

      queryClient.refetchQueries({ queryKey: ["usuario"] });
      setShouldRefetch(true);
    },
  });

  const handleCambiarTelefono = (data: {
    codarea: string;
    telefono: string;
  }) => {
    setCodareaInput(data.codarea);
    setTelefonoInput(data.telefono);

    console.log("data.codarea: ", data.codarea.trim());

    mutateTelefono(data);
  };

  const handleEmail = (data: EmailTelefono) => {
    setEmailInput(data.email);
    mutateEmail(data.email);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-4 py-10 bg-bottom bg-cover bg-perfil sm:min-h-screen">
      <div className="w-full max-w-6xl top-5 left-3">
        <Link
          to="/inicio"
          className="px-4 py-1 text-sm font-semibold text-white transition duration-200 rounded-lg bg-green sm:text-base hover:bg-greenHover"
        >
          Volver al inicio
        </Link>
      </div>

      <div className="w-full h-full max-w-6xl flex flex-col lg:flex-row justify-center items-center lg:items-start  my-5 bg-[white] border border-black rounded-lg py-5  shadow-xl border-opacity-20">
        {/* Imagen de perfil */}
        <div className="flex items-start justify-center w-full h-full lg:w-1/4 ">
          <div className="flex items-center justify-center w-20 h-20 text-5xl bg-white border rounded-full md:w-32 md:h-32 lg:w-40 lg:h-40">
            <span className="text-2xl md:text-4xl lg:text-5xl text-blue ">
              {usuario?.genero === "Masculino" ? <SlUser /> : <SlUserFemale />}
            </span>
          </div>
        </div>

        {/* Datos solo lectura */}
        <div className="flex flex-col w-full px-5 lg:pr-5 lg:w-2/3 sm:flex-grow">
          <h2 className="mb-4 text-2xl font-semibold text-center sm:text-4xl sm:text-left text-green">
            Datos del Perfil
          </h2>

          <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:mt-5">
            {(
              ["nombre", "apellido", "fnac", "genero"] as (keyof Usuario)[]
            ).map((field) => (
              <div key={field} className="flex items-center sm:gap-3">
                <label className="w-1/3 text-sm font-medium text-blue sm:text-base">
                  {field === "fnac"
                    ? "Fecha de Nacimiento"
                    : (field as string).charAt(0).toUpperCase() +
                      (field as string).slice(1)}
                </label>
                <p
                  className={`w-2/3 py-1 px-2 min-h-[35px] text-sm sm:text-base border border-gray-300 rounded-md bg-gray-200`}
                >
                  {usuario
                    ? field === "fnac"
                      ? formatDate(usuario[field])
                      : usuario[field]
                    : ""}
                </p>
              </div>
            ))}
          </div>

          {/* Telefono */}
          <div className="grid grid-cols-1 mb-5">
            <div className="flex items-center w-full">
              <label className="w-1/6 text-sm font-medium text-blue sm:text-base">
                Teléfono
              </label>
              {isEditingTelefono ? (
                <div className="flex w-2/3 gap-2">
                  <input
                    type="text"
                    className="w-1/4 text-sm sm:text-base py-1 px-2 min-h-[35px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 transition"
                    {...register("codarea")}
                  />
                  <span className="flex items-center text-sm sm:text-base">
                    15
                  </span>
                  <input
                    type="text"
                    className="w-2/5 text-sm sm:text-base py-1 px-2 min-h-[35px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 transition"
                    {...register("telefono")}
                  />
                </div>
              ) : (
                <div className="flex w-2/3 gap-2">
                  <p className="w-1/4 text-sm sm:text-base py-1 px-2 min-h-[35px] border border-gray-300 rounded-md bg-gray-200">
                    {usuario?.codarea}
                  </p>
                  <span className="flex items-center text-sm sm:text-base">
                    15
                  </span>
                  <p className="w-2/5 text-sm sm:text-base py-1 px-2 min-h-[35px] border border-gray-300 rounded-md bg-gray-200">
                    {usuario?.telefono}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="grid w-full grid-cols-1 ">
            <div className="flex items-center w-full">
              <label className="w-1/6 text-sm font-medium text-blue sm:text-base">
                Email
              </label>
              {isEditingEmail ? (
                <input
                  type="email"
                  className="w-full text-sm sm:text-base  py-1 px-2 min-h-[35px]  border border-gray-300 rounded-md focus:outline-none focus:border-blue focus:ring-1 transition"
                  {...register("email")}
                />
              ) : (
                <p className="w-2/3 text-sm sm:text-base sm:w-2/4 py-1 px-2 min-h-[35px]  border border-gray-300 rounded-md bg-gray-200">
                  {usuario?.email}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 mt-5">
            {!isEditingTelefono ? (
              <button
                type="button"
                onClick={() => setIsEditingTelefono(true)}
                className="px-4 py-1 text-sm font-semibold text-gray-600 transition duration-200 bg-gray-300 rounded-lg sm:text-base hover:bg-gray-400"
              >
                Cambiar Telefono
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSubmit(handleCambiarTelefono)}
                  className="px-4 py-1 text-sm font-semibold text-white transition duration-200 bg-blue-600 rounded-lg sm:text-base hover:bg-blue-700"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingTelefono(false)}
                  className="px-4 py-1 text-sm font-semibold text-white transition duration-200 bg-red-600 rounded-lg sm:text-base hover:bg-red-700"
                >
                  Cancelar
                </button>
              </div>
            )}

            {!isEditingEmail ? (
              <button
                type="button"
                onClick={() => setIsEditingEmail(true)}
                className="px-4 py-1 text-sm font-semibold text-gray-600 transition duration-200 bg-gray-300 rounded-lg sm:text-base hover:bg-gray-400"
              >
                Cambiar Email
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSubmit(handleEmail)}
                  className="px-4 py-1 text-sm font-semibold text-white transition duration-200 bg-blue-600 rounded-lg sm:text-base hover:bg-blue-700"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingEmail(false)}
                  className="px-4 py-1 text-sm font-semibold text-white transition duration-200 bg-red-600 rounded-lg sm:text-base hover:bg-red-700"
                >
                  Cancelar
                </button>
              </div>
            )}
            <button
              className="px-4 py-1 text-sm font-semibold text-gray-600 transition duration-200 bg-gray-300 rounded-lg sm:text-base hover:bg-gray-400"
              onClick={() =>
                navigate("?reestablecer_password=true&internal=true")
              }
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
