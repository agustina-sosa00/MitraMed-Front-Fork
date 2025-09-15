import {
  actualizarEmail,
  actualizarTelefono,
  obtenerDatosUsuario,
} from "@/views/app/paciente/turnos/services/TurnosService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { TiPencil } from "react-icons/ti";
import Swal from "sweetalert2";
import { Usuario } from "@/views/auth/types";
interface EmailTelefono {
  email: string;
  codarea: string;
  telefono: string;
}

export default function ConfigView() {
  const navigate = useNavigate();
  const isGoogleAuth = localStorage.getItem("isGoogleAuth") || "";
  const [isEditingTelefono, setIsEditingTelefono] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState<string>("");
  const [codareaInput, setCodareaInput] = useState<string>("");
  const [telefonoInput, setTelefonoInput] = useState<string>("");
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  const { register, setValue, handleSubmit } = useForm<EmailTelefono>({
    defaultValues: {
      email: "",
      codarea: "",
      telefono: "",
    },
  });

  const formatDate = (date: string) => {
    const parts = date.split("-");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const d = new Date(year, month, day);

    const formattedDay = String(d.getDate()).padStart(2, "0");
    const formattedMonth = String(d.getMonth() + 1).padStart(2, "0");
    const formattedYear = d.getFullYear();

    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  };

  const { data: dataUsuario } = useQuery<Usuario[], Error>({
    queryKey: ["usuario"],
    queryFn: obtenerDatosUsuario,
    initialData: [],
    enabled: shouldRefetch,
  });

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

      Swal.fire({
        icon: "error",
        title: error.message,
      });
    },
    onSuccess: (data) => {
      Swal.fire({
        title: data.message,
        icon: "success",
        draggable: true,
      });
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
    mutationFn: ({ codarea, telefono }: { codarea: string; telefono: string }) =>
      actualizarTelefono({ codarea, telefono }),
    onError: (error) => {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: error.message,
      });
    },
    onSuccess: (data) => {
      Swal.fire({
        title: data.message,
        icon: "success",
        draggable: true,
      });
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

  const handleCambiarTelefono = (data: { codarea: string; telefono: string }) => {
    setCodareaInput(data.codarea);
    setTelefonoInput(data.telefono);

    mutateTelefono(data);
  };

  const handleEmail = (data: EmailTelefono) => {
    setEmailInput(data.email);
    mutateEmail(data.email);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-4 py-10 bg-bottom bg-cover bg-perfil sm:min-h-screen">
      <div className="flex flex-col items-center justify-center h-full gap-3 p-5 bg-white border border-gray-200 rounded shadow-xl w-ful lg:w-1/2 ">
        {/* Datos solo lectura */}
        <h2 className="mb-4 text-2xl font-semibold text-center sm:text-4xl sm:text-left text-green">
          Datos del Perfil
        </h2>

        <div className="grid grid-cols-1 gap-3 ">
          {(["nombre", "apellido", "fnac", "genero"] as (keyof Usuario)[]).map((field) => (
            <div key={field} className="flex items-center sm:gap-3">
              <label className="w-1/3 text-sm font-medium text-blue sm:text-base">
                {field === "fnac"
                  ? "Fecha de Nacimiento"
                  : (field as string).charAt(0).toUpperCase() + (field as string).slice(1)}
              </label>
              <p
                className={`w-2/3 py-1 px-2 min-h-[35px] text-sm sm:text-base border border-gray-300 rounded  text-blue bg-gray-200`}
              >
                {usuario ? (field === "fnac" ? formatDate(usuario[field]) : usuario[field]) : ""}
              </p>
            </div>
          ))}
        </div>
        {/* Telefono */}

        <div className="flex items-center justify-center w-full gap-2 ">
          {isEditingTelefono ? (
            <div className="flex items-center justify-center gap-2">
              <label className="text-sm font-medium text-blue sm:text-base">Teléfono</label>
              <input
                type="text"
                className="w-1/6 text-sm sm:text-base py-1 px-2 min-h-[35px] border  border-gray-300 rounded focus:outline-none focus:border-green focus:ring-1 transition"
                {...register("codarea")}
              />
              <span className="flex items-center text-sm text-blue sm:text-base">15</span>
              <input
                type="text"
                className="w-1/5 text-sm sm:text-base py-1 px-2  min-h-[35px] border border-gray-300 rounded focus:outline-none focus:border-green focus:ring-1 transition"
                {...register("telefono")}
              />{" "}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSubmit(handleCambiarTelefono)}
                  className="px-4 py-1 text-sm font-semibold text-white transition duration-200 rounded bg-green sm:text-base hover:bg-blue-700"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingTelefono(false)}
                  className="px-4 py-1 text-sm font-semibold text-white transition duration-200 bg-red-600 rounded sm:text-base hover:bg-red-700"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <label className="text-sm font-medium text-blue sm:text-base">Teléfono</label>
              <div className="w-1/4 py-1 flex justify-center px-2 min-h-[35px] border border-gray-300 rounded bg-gray-200 ">
                <p className="text-sm sm:text-base text-blue">{usuario?.codarea}</p>
              </div>
              <span className="flex items-center text-sm text-blue sm:text-base">15</span>
              <div className=" bg-gray-200 py-1 px-2 min-h-[35px] border border-gray-300 rounded w-2/5 flex justify-center ">
                <p className="text-sm sm:text-base text-blue">{usuario?.telefono}</p>
              </div>

              <button
                type="button"
                onClick={() => setIsEditingTelefono(true)}
                className="p-2 text-base font-semibold transition duration-200 border border-gray-300 rounded text-green hover:bg-green hover:text-white"
              >
                <TiPencil />
              </button>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center justify-center w-full gap-2 ">
          <label className="text-sm font-medium text-blue sm:text-base">Email</label>
          {isEditingEmail ? (
            <div className="flex gap-2">
              <input
                type="email"
                className=" text-sm sm:text-base py-1 px-2  min-h-[35px] border border-gray-300 rounded focus:outline-none focus:border-green focus:ring-1 transition"
                {...register("email")}
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSubmit(handleEmail)}
                  className="px-4 py-1 text-sm font-semibold text-white transition duration-200 rounded bg-green sm:text-base hover:bg-blue-700"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingEmail(false)}
                  className="px-4 py-1 text-sm font-semibold text-white transition duration-200 bg-red-600 rounded sm:text-base hover:bg-red-700"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="bg-gray-200 py-1 px-2 min-h-[35px] border border-gray-300 rounded  flex justify-center ">
                <p className="text-sm sm:text-base text-blue">{usuario?.email}</p>
              </div>

              <button
                type="button"
                onClick={() => setIsEditingEmail(true)}
                className="p-2 text-base font-semibold transition duration-200 border border-gray-300 rounded text-green hover:bg-green hover:text-white"
              >
                <TiPencil />
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-start gap-3 ">
          <button
            className="px-4 py-1 text-sm font-semibold text-white transition duration-200 rounded bg-green sm:text-base hover:bg-greenHover"
            onClick={() => navigate("?reestablecer_password=true&internal=true")}
          >
            {isGoogleAuth ? "Agregar contraseña" : "Cambiar Contraseña"}
          </button>
        </div>
      </div>
    </div>
  );
}
