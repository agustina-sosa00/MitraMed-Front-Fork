import { SideBar } from "@/components/ui/SideBar";
import { Outlet } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { Navbar } from "@/components/features/PanelProfessional/Navbar";

const buttons = [
  {
    name: "inicio",
    icon: FaHouse,
    link: "/profesionales/inicio",
    disabled: false,
  },
];

export default function SecretariatLayout() {
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
