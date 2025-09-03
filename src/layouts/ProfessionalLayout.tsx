import { SideBar } from "@/components/ui/SideBar";
import { Outlet } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { FaNotesMedical, FaTooth, FaArchive } from "react-icons/fa";
import Cookies from "js-cookie";
import { Navbar } from "@/components/features/PanelProfessional/Navbar";
import { useEffect, useMemo, useState } from "react";
import { MdTableChart } from "react-icons/md";

interface IProp {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfessionalLayout: React.FC<IProp> = ({ setLoader }) => {
  const [disabledButtonSidebar, setDisabledButtonSidebar] = useState({
    inicio: false,
    turnos: false,
    historial: false,
    odontograma: false,
    tablaGral: false,
    turnosGrales: false,
  });

  const [isSecretaria, setIsSecretaria] = useState(false);

  useEffect(() => {
    const id = Cookies.get("idUsuario");
    setIsSecretaria(id === "3");
    const t = setTimeout(() => setLoader(false), 300);
    return () => clearTimeout(t);
  }, [setLoader]);

  const buttonsBase = useMemo(
    () => [
      {
        name: "inicio",
        icon: FaHouse,
        link: "/dashboard/inicio",
        disabled: disabledButtonSidebar.inicio,
        description: "",
      },
      {
        name: "turnos",
        icon: FaNotesMedical,
        link: "/dashboard/turnos",
        disabled: disabledButtonSidebar.turnos,
        description:
          "Accedé a tus turnos de una manera sencilla, con filtros por fecha y una tabla organizada.",
      },
      {
        name: "historial",
        icon: FaArchive,
        link: "/dashboard/historial",
        disabled: disabledButtonSidebar.historial,
        description:
          "Accedé al historial clínico, subí documentos y dejá observaciones.",
      },
      {
        name: "odontograma",
        icon: FaTooth,
        link: "/dashboard/odontograma",
        disabled: disabledButtonSidebar.odontograma,
        description:
          "Marcá diagnósticos y procedimientos por pieza, cara y estado.",
      },
      {
        name: "tabla gral.",
        icon: MdTableChart,
        link: "/dashboard/tabla-general",
        disabled: disabledButtonSidebar.tablaGral,
        description:
          "Panel centralizado para coordinar turnos de toda la clínica.",
      },
    ],
    [disabledButtonSidebar]
  );

  const buttonOffSecretariat = new Set(["turnos", "historial", "odontograma"]);

  const buttonsSidebar = useMemo(() => {
    const filtered = isSecretaria
      ? buttonsBase.filter((b) => !buttonOffSecretariat.has(b.name))
      : buttonsBase;

    return isSecretaria
      ? [
          ...filtered,
          {
            name: "turnos grales.",
            icon: FaNotesMedical,
            link: "/dashboard/turnos-generales",
            disabled: disabledButtonSidebar.turnosGrales,
            description:
              "Panel con una tabla de turnos filtrados por cada profesional de la clínica",
          },
        ]
      : filtered;
  }, [isSecretaria, buttonsBase, disabledButtonSidebar.turnosGrales]);

  return (
    <div className="flex w-full h-screen bg-white">
      <SideBar
        logo="https://i.imgur.com/HBsiL82.png"
        buttons={buttonsSidebar}
      />
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Navbar
          logo="https://i.imgur.com/HBsiL82.png"
          buttons={buttonsSidebar}
        />
        <div className="flex-1 overflow-y-auto">
          <Outlet
            context={{
              setDisabledButtonSidebar,
              disabledButtonSidebar,
              buttonsSidebar,
            }}
          />
        </div>
      </div>
    </div>
  );
};
