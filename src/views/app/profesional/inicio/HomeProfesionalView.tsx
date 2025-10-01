// import Cookies from "js-cookie";
import { useOutletContext } from "react-router-dom";
import { ContextType } from "@/views/app/profesional/types/index";
import CardInicioProfesionales from "./components/CardInicioProfesionales";
import TitleView from "../../_components/features/TitleView";

export default function HomeProfesionalView() {
  const { buttonsSidebar } = useOutletContext<ContextType>();
  // const data = Cookies.get("dataProfessional");
  // const dataProfesional = data ? JSON.parse(data) : null;

  return (
    <>
      <TitleView title="Inicio" />
      <div className="flex flex-col justify-center w-full ">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {buttonsSidebar
            .filter((b) => b.name !== "Inicio" && !b.disabled)
            .map((item) => (
              <CardInicioProfesionales
                key={item.key}
                text={item.name}
                description={item.description}
                link={item.link}
              />
            ))}
        </div>
      </div>
    </>
  );
}
