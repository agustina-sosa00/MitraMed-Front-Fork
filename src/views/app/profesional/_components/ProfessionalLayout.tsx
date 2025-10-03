import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import { FaHouse } from "react-icons/fa6";
import { FaTooth, FaArchive, FaUserCog, FaCogs, FaUserMd, FaNotesMedical } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import Navbar from "@/views/app/_components/features/Navbar";
import SideBar from "./SideBar";
import TextAlert from "@/views/_components/TextAlert";

export default function ProfessionalLayout() {
  // const isDevelopment = import.meta.env.VITE_ENV === "development";
  const tusuario = localStorage.getItem("_tu");

  const [disabledButtonSidebar, setDisabledButtonSidebar] = useState({
    inicio: false,
    turnos: false,
    historial: false,
    odontograma: false,
    tablaGral: false,
    turnosGrales: false,
    informe: false,
    informes: false,
    usuarios: false,
    configuracion: false,
  });

  const allButtons = {
    inicio: {
      key: "inicio",
      name: "Inicio",
      icon: FaHouse,
      link: "/dashboard/inicio",
      disabled: disabledButtonSidebar.inicio,
      description: "",
    },
    turnosProfesional: {
      key: "turnosProfesional",
      name: "Turnos Profesional",
      icon: FaUserMd,
      link: "/dashboard/turnos-profesional",
      disabled: disabledButtonSidebar.turnos,
      description:
        "Accedé a tus turnos de una manera sencilla, con filtros por fecha y una tabla organizada.",
    },
    turnosGrales: {
      key: "turnosGrales",
      name: "Turnos",
      icon: FaNotesMedical,
      link: "/dashboard/turnos",
      disabled: disabledButtonSidebar.turnosGrales,
      description: "Panel con una tabla de turnos filtrados por cada profesional de la clínica",
    },
    historial: {
      key: "historial",
      name: "Historia Clinica",
      icon: FaArchive,
      link: "/dashboard/historia-clinica",
      disabled: disabledButtonSidebar.historial,
      description: "Accedé al historial clínico, subí documentos y dejá observaciones.",
    },
    odontograma: {
      key: "odontograma",
      name: "Odontograma",
      icon: FaTooth,
      link: "/dashboard/odontograma",
      disabled: disabledButtonSidebar.odontograma,
      description: "Marcá diagnósticos y procedimientos por pieza, cara y estado.",
    },
    informes: {
      key: "informes",
      name: "Informes",
      icon: HiDocumentReport, // Icono de reporte/documento más específico
      link: "#", // No tiene link directo, es un desplegable
      disabled: disabledButtonSidebar.informes,
      description: "Informes y reportes del sistema.",
      isDropdown: true,
      subItems: [
        {
          key: "informe-turnos",
          name: "Informe de Turnos",
          link: "/dashboard/informe-turnos",
          disabled: disabledButtonSidebar.tablaGral,
          description: "Panel centralizado para realizar un seguimiento de las ventas.",
        },
      ],
    },
    procesos: {
      key: "procesos",
      name: "Procesos",
      icon: FaCogs, // Icono de reporte/documento más específico
      link: "#", // No tiene link directo, es un desplegable
      disabled: disabledButtonSidebar.informes,
      description: "Automatizaciones y procesos del sistema.",
      isDropdown: true,
      subItems: [
        {
          key: "envio-email-prof",
          name: "Email Profesionales",
          link: "/dashboard/procesos/envio-email-prof",
          disabled: disabledButtonSidebar.tablaGral,
          description: "Panel centralizado para envío de recordatorio de Emails a Doctores.",
        },
        {
          key: "envio-email-pac",
          name: "Email Pacientes",
          link: "/dashboard/procesos/envio-email-pac",
          disabled: disabledButtonSidebar.tablaGral,
          description: "Panel centralizado para envío de recordatorio de Emails a Pacients.",
        },
      ],
    },
    usuarios: {
      key: "usuarios",
      name: "Usuarios",
      icon: FaUserCog,
      link: "/dashboard/usuarios",
      disabled: disabledButtonSidebar.usuarios,
      description: "Gestión de usuarios del sistema.",
    },
    configuracion: {
      key: "configuracion",
      name: "Configuración",
      icon: IoSettingsSharp,
      link: "/dashboard/configuracion",
      disabled: disabledButtonSidebar.configuracion,
      description: "Configuración general del sistema.",
    },
  };

  const buttonsSidebar = useMemo(() => {
    return getButtonsForUser(tusuario, allButtons);
  }, [tusuario, disabledButtonSidebar]);

  // Calcular si el sidebar debe estar completamente deshabilitado
  const isSidebarDisabled = useMemo(() => {
    return Object.values(disabledButtonSidebar).some((disabled) => disabled);
  }, [disabledButtonSidebar]);

  function safe<T>(arr: (T | undefined)[]): T[] {
    return arr.filter(Boolean) as T[];
  }

  function getButtonsForUser(userType: string | null, buttons: typeof allButtons) {
    switch (userType) {
      // Caso 1 Doctor y 3 Odontologo ven lo mismo
      case "1":
      case "3":
        return safe([
          buttons.inicio,
          buttons.turnosProfesional,
          buttons.historial,
          buttons.odontograma,
        ]);

      case "2": // Secretaria
        return safe([buttons.inicio, buttons.turnosGrales, buttons.odontograma, buttons.procesos]);

      case "4": // Admin - ve todo
        return safe([
          buttons.inicio,
          buttons.turnosGrales,
          buttons.turnosProfesional,
          buttons.historial,
          buttons.odontograma,
          buttons.informes,
          buttons.procesos,
          buttons.usuarios,
        ]);

      case "5": // Admin - ve todo
        return safe([
          buttons.inicio,
          buttons.turnosGrales,
          buttons.turnosProfesional,
          buttons.historial,
          buttons.odontograma,
          buttons.informes,
          buttons.procesos,
          buttons.usuarios,
          buttons.configuracion,
        ]);

      default:
        return safe([buttons.inicio]);
    }
  }

  return (
    <>
      {/* FLAG DESARROLLO */}
      <TextAlert />

      {/* CONTENT */}
      <div className="relative flex w-full h-screen bg-white">
        <SideBar
          logo="https://i.imgur.com/HBsiL82.png"
          buttons={buttonsSidebar}
          isDisabled={isSidebarDisabled}
        />

        <div className="flex flex-col flex-1 h-screen overflow-hidden">
          <Navbar logo="https://i.imgur.com/HBsiL82.png" buttons={buttonsSidebar} />

          <div className="flex-1 overflow-y-auto">
            <div
              className={`flex flex-col items-center bg-[#f5f5f5] w-full min-h-screen gap-5 px-5 py-4 overflow-y-auto `}
            >
              <div className={`flex flex-col items-center justify-start w-full lg:w-full  `}>
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
        </div>
      </div>
    </>
  );
}
