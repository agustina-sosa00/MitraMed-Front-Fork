import { Outlet } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { FaHouse } from "react-icons/fa6";
import { FaNotesMedical, FaTooth, FaArchive } from "react-icons/fa";
import { MdTableChart } from "react-icons/md";
import { Navbar } from "@/views/app/components/features/Navbar";
import SideBar from "../ui/SideBar";

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
    informe: false,
  });

  const [tusuario, setTusuario] = useState<string | undefined>();
  const isSecretaria = tusuario === "2";
  const isAdmin = tusuario === "4";
  const canSeeInforme = tusuario !== "1" && tusuario !== "3";

  useEffect(() => {
    const t = localStorage.getItem("mtm-tusuario");
    setTusuario(t!);
    const to = setTimeout(() => setLoader(false), 300);
    return () => clearTimeout(to);
  }, [setLoader]);

  const buttonsBase = useMemo(
    () => [
      {
        key: "inicio",
        name: "Inicio",
        icon: FaHouse,
        link: "/dashboard/inicio",
        disabled: disabledButtonSidebar.inicio,
        description: "",
      },
      {
        key: "turnos",
        name: "Turnos",
        icon: FaNotesMedical,
        link: "/dashboard/turnos",
        disabled: disabledButtonSidebar.turnos,
        description:
          "Accedé a tus turnos de una manera sencilla, con filtros por fecha y una tabla organizada.",
      },
      {
        key: "historial",
        name: "HC",
        icon: FaArchive,
        link: "/dashboard/historial",
        disabled: disabledButtonSidebar.historial,
        description: "Accedé al historial clínico, subí documentos y dejá observaciones.",
      },
      {
        key: "odontograma",
        name: "Odontograma",
        icon: FaTooth,
        link: "/dashboard/odontograma",
        disabled: disabledButtonSidebar.odontograma,
        description: "Marcá diagnósticos y procedimientos por pieza, cara y estado.",
      },
      {
        key: "informe",
        name: "Informe de Turnos",
        icon: MdTableChart,
        link: "/dashboard/informe-turnos",
        disabled: disabledButtonSidebar.tablaGral,
        description: "Panel centralizado para realizar un seguimiento de las ventas.",
      },
    ],
    [disabledButtonSidebar],
  );

  const buttonsSidebar = useMemo(() => {
    let list = [...buttonsBase];

    if (!canSeeInforme) list = list.filter((b) => b.key !== "informe");

    if (isSecretaria) {
      const off = new Set(["turnos", "historial"]);
      list = list.filter((b) => !off.has(b.key));
    }

    if (isSecretaria || isAdmin) {
      const btnTurnosGrales = {
        key: "turnosGrales",
        name: "Turnos Grales.",
        icon: FaNotesMedical,
        link: "/dashboard/turnos-generales",
        disabled: disabledButtonSidebar.turnosGrales,
        description: "Panel con una tabla de turnos filtrados por cada profesional de la clínica",
      };
      const idxInforme = list.findIndex((b) => b.key === "informe");
      list =
        idxInforme === -1
          ? [...list, btnTurnosGrales]
          : [...list.slice(0, idxInforme), btnTurnosGrales, ...list.slice(idxInforme)];
    }

    return list;
  }, [buttonsBase, isSecretaria, isAdmin, canSeeInforme, disabledButtonSidebar.turnosGrales]);

  return (
    <div className="flex w-full h-screen bg-white">
      <SideBar logo="https://i.imgur.com/HBsiL82.png" buttons={buttonsSidebar} />
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Navbar logo="https://i.imgur.com/HBsiL82.png" buttons={buttonsSidebar} />
        <div className="flex-1 overflow-y-auto">
          <Outlet
            context={{
              setDisabledButtonSidebar,
              disabledButtonSidebar,
              buttonsSidebar,
              canSeeInforme,
            }}
          />
        </div>
      </div>
    </div>
  );
};
