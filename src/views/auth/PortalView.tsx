import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Footer from "@/views/auth/components/feature/Footer";
// import SignInForm from "@/components/features/forms/SignInForm";
import WhatsApp from "@/views/auth/components/feature/WhatsApp";
import { About } from "./About/About";
import { CardsAbout } from "@/views/auth/components/ui/CardsAbout";
import Header from "@/views/auth/components/feature/Header";
import CarrouselPortal from "./components/feature/CarrouselPortal";
import { ConfirmDataUser } from "../components/features/modals/ConfirmDataUser";
import CreateAccountModal from "../components/features/modals/CreateAccountModal";
import ForgotPasswordModal from "../components/features/modals/ForgotPasswordModal";
import ConfirmAccountModal from "../components/features/modals/ConfirmAccountModal";
import GoogleAuthModal from "../components/features/modals/GoogleAuthModal";
import NewPasswordModal from "../components/features/modals/NewPasswordModal";
import NewTokenConfirm from "../components/features/modals/NewTokenConfirm";
interface IProp {
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PortalView: React.FC<IProp> = ({ setLoader }) => {
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
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} hideProgressBar={true} />
    </>
  );
};
