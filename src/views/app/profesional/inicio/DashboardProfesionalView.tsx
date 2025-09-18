import React from "react";
import Cookies from "js-cookie";
import { ContainView } from "@/views/app/components/features/ContainView";
import { useOutletContext } from "react-router-dom";
import { ContextType } from "@/views/app/profesional/types/index";
import CardInicioProfesionales from "./components/CardInicioProfesionales";

export const DashboardProfesionalView: React.FC = () => {
  const { buttonsSidebar } = useOutletContext<ContextType>();
  const data = Cookies.get("dataProfessional");
  const dataProfesional = data ? JSON.parse(data) : null;
  return (
    <ContainView
      padding="py-3 2xl:py-20 px-10"
      gapChildren="gap-2"
      sizeTitle="text-3xl 2xl:text-4xl"
      title={`${dataProfesional.ndoctor && dataProfesional.adoctor ? `¡Bienvenido/a ${dataProfesional.ndoctor} ${dataProfesional.adoctor}!` : `¡Bienvenido/a ${dataProfesional.nombre}!`}`}
    >
      <div className="flex flex-col justify-center w-full ">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {buttonsSidebar
            .filter((b) => b.name !== "Inicio" && !b.disabled)
            .map((item) => (
              <CardInicioProfesionales
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
