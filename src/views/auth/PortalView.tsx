import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Footer from "@/components/ui/Footer";
// import SignInForm from "@/components/features/forms/SignInForm";
import CreateAccountModal from "@/components/features/modals/CreateAccountModal";
import ConfirmAccountModal from "@/components/features/modals/ConfirmAccountModal";
import ForgotPasswordModal from "@/components/features/modals/ForgotPasswordModal";
import NewPasswordModal from "@/components/features/modals/NewPasswordModal";
import NewTokenConfirm from "@/components/features/modals/NewTokenConfirm";
import { CarrouselPortal } from "@/components/ui/CarrouselPortal";
import GoogleAuthModal from "@/components/features/modals/GoogleAuthModal";
import WhatsApp from "@/components/features/WhatsApp";
import { About } from "./About/About";
import { CardsAbout } from "@/components/ui/CardsAbout";
import Header from "@/components/ui/Header";
import { ConfirmDataUser } from "@/components/features/modals/ConfirmDataUser";
interface IProp {
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PortalView: React.FC<IProp> = ({ setLoader }) => {
  const navigate = useNavigate();
  const [isopenDrawer, setIsOpenDrawer] = useState(false);
  const [currentRol, setCurrentRol] = useState<
    "paciente" | "profesional" | undefined
  >();

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
    setTimeout(() => {
      setCurrentRol(undefined);
    }, 500);
  };
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
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        hideProgressBar={true}
      />
    </>
  );
};
