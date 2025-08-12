import { StartCard } from "@/components/features/PanelProfessional/StartCard";
import React from "react";

import Cookies from "js-cookie";
import { ContainView } from "@/components/features/PanelProfessional/ContainView";
export const Secretariat: React.FC = () => {
  const data = Cookies.get("dataProfessional");
  const user = data ? JSON.parse(data) : null;

  return (
    <ContainView title={`¡Bienvenida Sta.  ${user?.nombre}!`}>
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
    </ContainView>

  );
};
