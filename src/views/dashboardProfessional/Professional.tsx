import { StartCard } from "@/components/features/PanelProfessional/StartCard";
import React from "react";
import Cookies from "js-cookie";

export const Professional: React.FC = () => {
  const data = Cookies.get("dataProfessional");
  const name = data ? JSON.parse(data) : null;
  return (
    <div className="flex items-center justify-center w-full min-h-screen pt-24 lg:h-screen ">
      <div className=" w-[80%] h-[60%] flex flex-col justify-center lg:justify-start items-center gap-8  ">
        <h1 className="text-2xl font-medium text-center uppercase lg:text-4xl text-green">
          ¡Bienvenido Dr. {name?.ndoctor} {name?.adoctor}!
        </h1>
        <div className="flex flex-col justify-center w-full px-10 ">
          <div className="flex flex-col items-center justify-center w-full gap-3 py-5 lg:flex-row ">
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
              link={"/profesionales/subir-estudio"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
