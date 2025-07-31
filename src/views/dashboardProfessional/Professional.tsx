import { StartCard } from "@/components/features/PanelProfessional/StartCard";
import React from "react";
import Cookies from "js-cookie";

export const Professional: React.FC = () => {
  const data = Cookies.get("dataProfessional");
  const name = data ? JSON.parse(data) : null;
  return (
    <div className="flex items-start justify-center w-full min-h-screen pt-20 lg:h-screen ">
      <div className=" w-full h-[60%] flex flex-col justify-center lg:justify-start items-center gap-8  ">
        <h1 className="text-2xl font-medium text-center uppercase lg:text-4xl text-green">
          ¡Bienvenido Dr. {name?.ndoctor} {name?.adoctor}!
        </h1>
        <div className="flex flex-col justify-center w-full ">
          <div className="flex items-center justify-center w-full gap-3 py-5 lg:flex-row ">
            <StartCard
              text={"Ver mis turnos"}
              description={
                "Consulta y gestiona tus turnos programados de manera rápida y sencilla."
              }
              link={"/profesionales/turnos"}
            />
            <StartCard
              text={"Historiales Médicos"}
              description={
                "Accede al historial médico de tus pacientes y revisa la información cuando lo necesites."
              }
              link={"/profesionales/historial"}
            />
            <StartCard
              text={"Odontograma"}
              description={
                "Visualiza y edita el odontograma de tus pacientes para llevar un seguimiento preciso."
              }
              link={"/profesionales/odontograma"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
