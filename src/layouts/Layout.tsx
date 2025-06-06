import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/ui/Footer";
import Cookies from "js-cookie";
import Header from "@/components/ui/Header";
import NewPasswordModal from "@/components/features/modals/NewPasswordModal";
import WhatsApp from "@/components/features/WhatsApp";

export default function Layout() {
  const [isopenDrawer, setIsOpenDrawer] = useState(false);
  const [currentRol, setCurrentRol] = useState<
    "paciente" | "profesional" | undefined
  >();

  const handleOpenDrawer = (rol: "paciente" | "profesional") => {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        state={isopenDrawer}
        setState={setIsOpenDrawer}
        currentRol={currentRol}
        handleOpenDrawer={handleOpenDrawer}
        handleCloseDrawer={handleCloseDrawer}
      />

      <div className="flex-grow ">
        <Outlet />
      </div>

      <WhatsApp />

      <Footer />

      <NewPasswordModal />

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        hideProgressBar={true}
      />
    </div>
  );
}
