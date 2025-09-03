import { StartCard } from "@/components/features/PanelProfessional/StartCard";
import React from "react";
import Cookies from "js-cookie";
import { ContainView } from "@/components/features/PanelProfessional/ContainView";
import { useOutletContext } from "react-router-dom";
import { ContextType } from "@/types/index";

export const Dashboard: React.FC = () => {
  const { buttonsSidebar } = useOutletContext<ContextType>();
  const data = Cookies.get("dataProfessional");
  const dataProfesional = data ? JSON.parse(data) : null;
  return (
    <ContainView
      padding="py-5"
      title={`${
        dataProfesional!.tusuario === 1
          ? `¡Bienvenido ${dataProfesional.ndoctor} ${dataProfesional.adoctor}!`
          : `¡Bienvenida ${dataProfesional.nombre}!`
      } `}
    >
      <div className="flex flex-col justify-center w-full ">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {buttonsSidebar
            .filter((b) => b.name !== "inicio" && !b.disabled)
            .map((item) => (
              <StartCard
                key={item.link}
                text={item.name}
                description={item.description}
                link={item.link}
              />
            ))}
        </div>
      </div>
    </ContainView>
  );
};
