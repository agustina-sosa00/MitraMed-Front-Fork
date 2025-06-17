import { SideBar } from "@/components/ui/SideBar";
import { Outlet } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { FaNotesMedical } from "react-icons/fa";
import { Navbar } from "@/components/features/PanelProfessional/Navbar";
import { RiFolderUploadFill } from "react-icons/ri";

const buttons = [
  {
    name: "inicio",
    icon: FaHouse,
    link: "/profesionales/inicio",
  },
  {
    name: "turnos",
    icon: FaNotesMedical,
    link: "/profesionales/turnos",
  },
  {
    name: "subir estudio",
    icon: RiFolderUploadFill,
    link: "/profesionales/subir-estudio",
  },
];

export default function ProfessionalLayout() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-right bg-no-repeat lg:flex-row bg-profesional ">
      <Navbar logo={"https://i.imgur.com/HBsiL82.png"} buttons={buttons} />
      <SideBar logo={"https://i.imgur.com/HBsiL82.png"} buttons={buttons} />
      <div className="w-full ">
        <Outlet />
      </div>
    </div>
  );
}
