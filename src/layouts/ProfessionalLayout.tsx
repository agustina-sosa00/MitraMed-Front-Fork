import { SideBar } from "@/components/ui/SideBar";
import { Outlet } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { FaNotesMedical, FaTooth } from "react-icons/fa";

import { Navbar } from "@/components/features/PanelProfessional/Navbar";
import { FaArchive } from "react-icons/fa";
import { useEffect, useState } from "react";

interface IProp {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ProfessionalLayout: React.FC<IProp> = ({ setLoader }) => {
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 300);
  }, []);

  const [disabledButton, setDisabledButton] = useState({
    inicio: false,
    turnos: false,
    historial: false,
    odontograma: false,
  });

  const buttons = [
    {
      name: "inicio",
      icon: FaHouse,
      link: "/profesionales/inicio",
      disabled: disabledButton.inicio,
    },
    {
      name: "turnos",
      icon: FaNotesMedical,
      link: "/profesionales/turnos",
      disabled: disabledButton.turnos,
    },
    {
      name: "historial",
      icon: FaArchive,
      link: "/profesionales/historial",
      disabled: disabledButton.historial,
    },
    {
      name: "odontograma",
      icon: FaTooth,
      link: "/profesionales/odontograma",
      disabled: disabledButton.odontograma,
    },
  ];
  return (
    // <div className="flex w-full h-screen bg-right bg-no-repeat bg-cover bg-profesional">
    <div className="flex w-full h-screen bg-white">
      <SideBar logo={"https://i.imgur.com/HBsiL82.png"} buttons={buttons} />

      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Navbar logo={"https://i.imgur.com/HBsiL82.png"} buttons={buttons} />
        <div className="flex-1 overflow-y-auto">
          <Outlet context={{ setDisabledButton, disabledButton }} />
        </div>
      </div>
    </div>
  );
};
