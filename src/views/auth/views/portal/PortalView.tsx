import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { About } from "../../About/About";
import { CardsAbout } from "@/views/auth/_components/ui/CardsAbout";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Footer from "@/views/auth/_components/feature/Footer";
import WhatsApp from "@/views/auth/_components/feature/WhatsApp";
import Header from "@/views/auth/_components/feature/Header";
import CarrouselPortal from "../../_components/feature/CarrouselPortal";
import { ConfirmDataUser } from "./components/modals/ConfirmDataUser";
import CreateAccountModal from "./components/modals/CreateAccountModal";
import ForgotPasswordModal from "./components/modals/ForgotPasswordModal";
import ConfirmAccountModal from "./components/modals/ConfirmAccountModal";
import GoogleAuthModal from "./components/modals/GoogleAuthModal";
import NewPasswordModal from "./components/modals/NewPasswordModal";
import NewTokenConfirm from "./components/modals/NewTokenConfirm";

interface IProp {
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function PortalView({ setLoader }: IProp) {
  const navigate = useNavigate();
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

  useEffect(() => {
    const viteEnv = import.meta.env.VITE_ENV;
    if (viteEnv === "development") {
      localStorage.setItem("_e", "20");
      localStorage.setItem("_m", "homo");
      localStorage.setItem("_env", "des");
    } else {
      localStorage.setItem("_m", "prod");
      localStorage.setItem("_env", "prod");
    }
  }, []);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has("google_auth")) {
      if (queryParams.has("code")) {
        return;
      }
    }

    if (!queryParams.has("confirmar_cuenta")) {
      if (queryParams.has("reestablecer_password")) {
        return;
      }

      if (accessToken) {
        navigate("/inicio");
      }
      if (!accessToken || !refreshToken) {
        navigate("/");
      }
    }
  }, []);

  return (
    <>
      <Header
        state={isopenDrawer}
        setState={setIsOpenDrawer}
        currentRol={currentRol}
        handleOpenDrawer={handleOpenDrawer}
        handleOpenDrawerProfessional={handleOpenDrawerProfessional}
        handleCloseDrawer={handleCloseDrawer}
      />

      <CarrouselPortal
        setLoader={setLoader}
        state={isopenDrawer}
        setState={setIsOpenDrawer}
        currentRol={currentRol}
        handleOpenDrawer={handleOpenDrawer}
        handleCloseDrawer={handleCloseDrawer}
      />
      <CardsAbout />
      <About
        state={isopenDrawer}
        setState={setIsOpenDrawer}
        currentRol={currentRol}
        handleOpenDrawer={handleOpenDrawer}
        handleCloseDrawer={handleCloseDrawer}
      />

      <WhatsApp />

      <Footer />
      <ConfirmDataUser />
      <CreateAccountModal />
      <ForgotPasswordModal />
      <ConfirmAccountModal />
      <GoogleAuthModal />
      <NewPasswordModal />
      <NewTokenConfirm />
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} hideProgressBar={true} />
    </>
  );
}
