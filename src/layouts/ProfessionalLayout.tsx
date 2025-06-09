import { SideBar } from "@/components/ui/SideBar";
import { Outlet } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { FaNotesMedical } from "react-icons/fa";

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
];

export default function ProfessionalLayout() {
  return (
    <div className="flex min-h-screen">
      <SideBar logo={"https://i.imgur.com/HBsiL82.png"} buttons={buttons} />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}
