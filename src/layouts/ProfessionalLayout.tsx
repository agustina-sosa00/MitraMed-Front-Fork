import { SideBar } from "@/components/ui/SideBar";
import { Outlet } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { FaNotesMedical, FaTooth } from "react-icons/fa";
import { Navbar } from "@/components/features/PanelProfessional/Navbar";
import { FaArchive } from "react-icons/fa";
import { useEffect } from "react";

const buttons = [
  {
    name: "inicio",
    icon: FaHouse,
    link: "/profesionales/inicio",
    disabled: false,
  },
  {
    name: "turnos",
    icon: FaNotesMedical,
    link: "/profesionales/turnos",
    disabled: false,
  },
  {
    name: "historial",
    icon: FaArchive,
    link: "/profesionales/historial",
    disabled: false,
  },
  {
    name: "odontograma",
    icon: FaTooth,
    link: "/profesionales/odontograma",
    disabled: false,
  },
];
interface IProp {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ProfessionalLayout: React.FC<IProp> = ({ setLoader }) => {
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 300);
  }, []);
  return (
    <div className="flex flex-col w-full min-h-screen bg-right bg-no-repeat bg-cover lg:flex-row bg-profesional ">
      <Navbar logo={"https://i.imgur.com/HBsiL82.png"} buttons={buttons} />
      <SideBar logo={"https://i.imgur.com/HBsiL82.png"} buttons={buttons} />
      <div className="w-full ">
        <Outlet />
      </div>
    </div>
  );
};
