import React from "react";
import { useNavigate } from "react-router-dom";
interface IProp {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}
export const InfoAbout = ({ state, setState }: IProp) => {
  const navigate = useNavigate();
  const handleOpenDrawer = () => {
    setState(!state);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-3 py-5 lg:py-0 lg:items-start lg:w-1/2">
      <h1 className="font-serif text-2xl text-green md:text-4xl">
        MitraMed - Centro Médico
      </h1>

      <div className="w-[80%] gap-2 flex flex-col">
        <p className="leading-relaxed text-center lg:text-start text-blue xl:text-lg">
          Bienvenido al portal de reserva de turnos para nuestro Centro Médico,
          donde podrás agendar tus consultas de forma rápida y sencilla.
        </p>

        <p className="leading-relaxed text-center lg:text-start text-blue xl:text-lg">
          Para disfrutar de todas las funciones,{" "}
          <button
            onClick={handleOpenDrawer}
            className="font-bold text-greenHover hover:underline"
          >
            inicia sesión en tu cuenta
          </button>
          . Si aún no tienes una,{" "}
          <button
            onClick={() => navigate(location.pathname + "?createAccount=true")}
            className="font-bold text-greenHover hover:underline"
          >
            regístrate
          </button>{" "}
          para comenzar a usar nuestras herramientas.
        </p>

        <p className="leading-relaxed text-center lg:text-start text-blue xl:text-lg">
          Disfruta de un servicio personalizado que te permitirá organizar las
          consultas según tus necesidades y las de tu familia.
        </p>
        <div className="w-[95%] ">
          <p className="mt-5 text-xl italic font-semibold tracking-wide text-center lg:text-start text-blue lg:text-2xl xl:text-3xl">
            ¡Gracias por elegirnos!
          </p>
        </div>
      </div>
    </div>
  );
};
