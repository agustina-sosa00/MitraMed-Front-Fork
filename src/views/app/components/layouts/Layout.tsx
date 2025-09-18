import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/views/auth/components/feature/Footer";
import Cookies from "js-cookie";
import Header from "@/views/auth/components/feature/Header";
import WhatsApp from "@/views/auth/components/feature/WhatsApp";
import NewPasswordModal from "@/views/auth/views/portal/components/modals/NewPasswordModal";
interface IProp {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Layout: React.FC<IProp> = ({ setLoader }) => {
  const [isopenDrawer, setIsOpenDrawer] = useState(false);
  const [currentRol, setCurrentRol] = useState<"paciente" | "profesional" | undefined>();

  const handleOpenDrawer = (rol: "paciente") => {
    setCurrentRol(rol);
    setIsOpenDrawer(true);
  };
  const handleOpenDrawerProfessional = (rol: "profesional") => {
    setCurrentRol(rol);
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setCurrentRol(undefined);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (!accessToken || !refreshToken) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 300);
  }, [setLoader]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        state={isopenDrawer}
        setState={setIsOpenDrawer}
        currentRol={currentRol}
        handleOpenDrawer={handleOpenDrawer}
        handleOpenDrawerProfessional={handleOpenDrawerProfessional}
        handleCloseDrawer={handleCloseDrawer}
      />
      <div className="flex-grow ">
        <Outlet />
      </div>

      <WhatsApp />

      <Footer />

      <NewPasswordModal />

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} hideProgressBar={true} />
    </div>
  );
};
