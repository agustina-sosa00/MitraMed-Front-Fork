import { StartCard } from "@/components/features/PanelProfessional/StartCard";
import React from "react";

export const Secretariat: React.FC = () => {
  const name = "Sta. Catalina Garcia";
  return (
    <div className="flex items-center justify-center w-full min-h-screen pt-24 lg:h-screen ">
      <div className=" w-[80%] h-[60%] flex flex-col justify-center lg:justify-start items-center gap-8  ">
        <h1 className="text-2xl font-medium text-center uppercase lg:text-4xl text-green">
          ¡Bienvenida {name}!
        </h1>
        <div className="flex flex-col justify-center w-full px-10 ">
          <div className="flex flex-col items-center justify-center w-full gap-3 py-5 lg:flex-row ">
            <StartCard
              text={"Ver turnos"}
              description={
                "Si haces click en subir estudio accederás a un formulario donde podrás subir un archivo nuevo."
              }
              link={"#"}
            />
            <StartCard
              text={"Historiales medicos"}
              description={
                "Si haces click en subir estudio accederás a un formulario donde podrás subir un archivo nuevo."
              }
              link={"#"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
