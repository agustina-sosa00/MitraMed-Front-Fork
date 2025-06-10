import { StartCard } from "@/components/features/PanelProfessional/StartCard";
import React from "react";

export const Professional: React.FC = () => {
  const name = "Dr. Juan Lopez";
  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <div className="w-[80%] h-[60%] flex flex-col justify-start items-center gap-8  ">
        <h1 className="text-4xl font-medium uppercase text-green">
          ¡Bienvenido {name}!
        </h1>
        <div className="flex flex-col justify-center w-full px-10 ">
          <div className="flex justify-center w-full gap-3 py-5 ">
            <StartCard
              text={"Ver mis turnos"}
              description={
                "Si haces click en subir estudio accederás a un formulario donde podrás subir un archivo nuevo."
              }
              link={"/profesionales/turnos"}
            />
            <StartCard
              text={"Subir estudio"}
              description={
                "Si haces click en subir estudio accederás a un formulario donde podrás subir un archivo nuevo."
              }
              link={"/profesionales/inicio"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
