import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
// import SignInForm from "@/components/features/forms/SignInForm";
import CreateAccountModal from "@/components/features/modals/CreateAccountModal";
import ConfirmAccountModal from "@/components/features/modals/ConfirmAccountModal";
import ForgotPasswordModal from "@/components/features/modals/ForgotPasswordModal";
import NewPasswordModal from "@/components/features/modals/NewPasswordModal";
import NewTokenConfirm from "@/components/features/modals/NewTokenConfirm";
import CarrouselPortal from "@/components/ui/CarrouselPortal";
import GoogleAuthModal from "@/components/features/modals/GoogleAuthModal";
import WhatsApp from "@/components/features/WhatsApp";
import { About } from "./About/About";
import { CardsAbout } from "@/components/ui/CardsAbout";

export default function PortalView() {
  const navigate = useNavigate();
  const [isopenDrawer, setIsOpenDrawer] = useState(false);

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
      <Header state={isopenDrawer} setState={setIsOpenDrawer} />

      <CarrouselPortal state={isopenDrawer} setState={setIsOpenDrawer} />
      <CardsAbout />
      <About />

      <WhatsApp />

      <Footer />

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
}
