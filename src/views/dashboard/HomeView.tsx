import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomeView() {
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div
      className={`flex flex-col items-center min-h-full   ${
        isLoading ? "invisible" : "visible"
      }`}
    >
      <div className="relative w-full px-6 py-20 text-center">
        <div
          className="absolute inset-0 bg-black opacity-50"
          style={{
            backgroundImage: "url(/med/herramientas-1.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="relative z-10">
          <h2 className="mb-6 text-3xl font-extrabold text-green sm:text-5xl">
            Tu salud, nuestra prioridad.
          </h2>
          <p className="max-w-3xl mx-auto text-xl font-medium leading-relaxed text-blue">
            Estamos aquí para hacer tu experiencia más sencilla y conveniente.
            Nuestro compromiso es ofrecerte soluciones rápidas, seguras y
            adaptadas a tus necesidades.
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
