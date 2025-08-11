import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { FaHouse } from "react-icons/fa6";
import { FaNotesMedical } from "react-icons/fa";
import { MdTableChart } from "react-icons/md";

import { SideBar } from "@/components/ui/SideBar";
import { Navbar } from "@/components/features/PanelProfessional/Navbar";

const buttons = [
  {
    name: "inicio",
    icon: FaHouse,
    link: "/secretaria/inicio",
    disabled: false,
  },
  {
    name: "turnos",
    icon: FaNotesMedical,
    link: "/secretaria/turnos",
    disabled: false,
  },
  {
    name: "tabla gral.",
    icon: MdTableChart,
    link: "/secretaria/tabla-general",
    disabled: false,
  },
];
interface IProp {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SecretariatLayout: React.FC<IProp> = ({ setLoader }) => {
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 300);
  }, [setLoader]);
  return (
    <div className="flex w-full h-screen bg-right bg-no-repeat bg-cover bg-profesional">
      <SideBar logo={"https://i.imgur.com/HBsiL82.png"} buttons={buttons} />

      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Navbar logo={"https://i.imgur.com/HBsiL82.png"} buttons={buttons} />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
