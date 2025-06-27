import {
  actualizarTelefono,
  obtenerDatosUsuario,
} from "@/services/TurnosService";
import { Usuario } from "@/types/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TiPencil } from "react-icons/ti";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

interface EmailTelefono {
  codarea: string;
  telefono: string;
}

export default function HomeView() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  console.log("usuario", usuario);
  const [isEditingTelefono, setIsEditingTelefono] = useState(false);
  const [codareaInput, setCodareaInput] = useState<string>("");
  const [telefonoInput, setTelefonoInput] = useState<string>("");
  const queryClient = useQueryClient();

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
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = "/med/herramientas-1.webp";
    link.as = "image";
    document.head.appendChild(link);

    window.scrollTo(0, 0);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      document.head.removeChild(link);
    };
  }, []);
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

  const handleCambiarTelefono = (data: {
    codarea: string;
    telefono: string;
  }) => {
    setCodareaInput(data.codarea);
    setTelefonoInput(data.telefono);

    mutateTelefono(data);
  };

  const { register, setValue, handleSubmit } = useForm<EmailTelefono>({
    defaultValues: {
      codarea: "",
      telefono: "",
    },
  });

  useEffect(() => {
    if (usuario) {
      setValue("codarea", usuario.codarea);
      setValue("telefono", usuario.telefono);
    }
  }, [usuario, setValue]);
  return (
    <div
      className={`flex flex-col items-center min-h-full   ${
        isLoading ? "invisible" : "visible"
      }`}
    >
      <div className="relative w-full px-6 py-20 text-center">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "url(/med/herramientas-1.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="relative z-10 flex flex-col gap-5">
          <h2 className="text-3xl font-extrabold text-green sm:text-5xl">
            {usuario?.genero === "Femenino"
              ? `¡Bienvenida ${usuario?.nombre}!`
              : `¡Bienvenido ${usuario?.nombre}!`}
          </h2>
          <div className="flex flex-col items-center justify-center w-full gap-2 lg:flex-row ">
            <p className="text-xl font-medium text-blue">
              Tu número de teléfono es:
            </p>
            {/* Telefono */}

            <div className="flex items-center justify-center gap-2">
              {isEditingTelefono ? (
                <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
                  <div className="flex items-center justify-center gap-1">
                    <input
                      type="text"
                      className="w-1/6 text-sm sm:text-base py-1 px-2 min-h-[35px] border  border-gray-300 rounded focus:outline-none focus:border-green focus:ring-1 transition"
                      {...register("codarea")}
                    />
                    <span className="flex items-center text-sm text-blue sm:text-base">
                      15
                    </span>
                    <input
                      type="text"
                      className="w-1/4 text-sm sm:text-base py-1 px-2  min-h-[35px] border border-gray-300 rounded focus:outline-none focus:border-green focus:ring-1 transition"
                      {...register("telefono")}
                    />{" "}
                  </div>

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
                  <div className=" py-1 flex justify-center px-2 min-h-[35px] border border-gray-300 rounded bg-gray-200 ">
                    {usuario?.codarea} {usuario?.telefono}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsEditingTelefono(true)}
                    className="p-2 text-base font-semibold text-white transition duration-200 border rounded bg-green hover:bg-greenHover"
                  >
                    <TiPencil />
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-xl font-medium text-blue">
            Estamos para ayudarte a que tu experiencia médica sea más cómoda,
            organizada y segura.
          </p>
        </div>
      </div>

      {/* Sección de acciones */}
      <div className="flex flex-col items-center w-full gap-8 px-4 mt-8 mb-10 mx:flex-row mx:justify-around">
        <div className="relative flex items-center justify-center w-full max-w-md p-6 overflow-hidden text-center bg-blue-800 rounded-lg shadow-lg lg:max-w-lg min-h-60 group ">
          <div
            className="absolute inset-0 z-0 transition-transform duration-300 ease-in-out transform bg-center bg-cover opacity-50 group-hover:scale-110"
            style={{
              backgroundImage: "url(/med/doc-3.webp)",
            }}
          ></div>

          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full mx-auto gap-7">
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-2xl font-semibold text-blue">
                ¿Necesitas un turno?
              </p>
              <p className=" text-blue">
                Agenda tu próxima consulta de rápida y eficazmente.
              </p>
            </div>

            <div className="relative z-10 mx-auto w-fit">
              <Link
                to="/turnos"
                className="inline-block px-4 py-1 text-lg font-semibold text-white transition duration-300 rounded-lg bg-green hover:bg-greenHover"
              >
                Sacar un Turno
              </Link>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center w-full max-w-md p-6 overflow-hidden text-center bg-blue-800 rounded-lg shadow-lg lg:max-w-lg min-h-60 group ">
          <div
            className="absolute inset-0 z-0 transition-transform duration-300 ease-in-out transform bg-center bg-cover opacity-50 group-hover:scale-110"
            style={{
              backgroundImage: "url(/med/doc-6.webp)",
            }}
          ></div>

          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full mx-auto gap-7">
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-2xl font-semibold text-blue">
                ¿Quieres ver tus turnos?
              </p>
              <p className="text-blue">
                Consulta el historial de tus turnos reservados
                <br />y mantente al tanto de tus próximas citas.
              </p>
            </div>
            <div className="relative z-10 mx-auto w-fit">
              <Link
                to="/mis-turnos"
                className="inline-block px-4 py-1 text-lg font-semibold text-white transition duration-300 rounded-lg bg-green hover:bg-greenHover"
              >
                Ver mis Turnos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
