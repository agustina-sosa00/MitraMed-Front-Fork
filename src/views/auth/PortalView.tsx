import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import SignInForm from "@/components/features/forms/SignInForm";
import CreateAccountModal from "@/components/features/modals/CreateAccountModal";
import ConfirmAccountModal from "@/components/features/modals/ConfirmAccountModal";
import ForgotPasswordModal from "@/components/features/modals/ForgotPasswordModal";
import NewPasswordModal from "@/components/features/modals/NewPasswordModal";
import NewTokenConfirm from "@/components/features/modals/NewTokenConfirm";
import CarrouselPortal from "@/components/ui/CarrouselPortal";
import GoogleAuthModal from "@/components/features/modals/GoogleAuthModal";
import WhatsApp from "@/components/features/WhatsApp";

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

      {/* Portal */}
      <div className="flex flex-col items-center justify-between w-full py-1 lg:items-baseline mx:flex-row mb-11">
        <div className="flex flex-col items-start space-y-6 lg:w-4/6 xl:max-w-6xl">
          <h2 className="mx-auto mb-6 font-serif text-2xl font-semibold text-center text-gray-800 underline lg:text-4xl lg:font-normal lg:decoration-4 underline-offset-4">
            MitraMed - Centro Médico
          </h2>

          <div className="ml-5 mr-8 space-y-6 indent-8 sm:mx-10 sm:indent-0 mx:indent-8">
            <p className="text-lg leading-relaxed text-justify text-gray-800 lg:text-xl xl:text-2xl">
              Bienvenido al portal de{" "}
              <span className="font-medium text-blue-600">
                reserva de turnos
              </span>{" "}
              para nuestro Centro Médico, donde podrás agendar tus consultas de
              forma rápida y sencilla.
            </p>

            <p className="text-lg leading-relaxed text-justify text-gray-800 lg:text-xl xl:text-2xl">
              Para disfrutar de todas las funciones,{" "}
              <span className="font-medium underline decoration-amber-500 decoration-2 underline-offset-2">
                inicia sesión en tu cuenta
              </span>
              . Si aún no tienes una,{" "}
              <span className="font-semibold text-blue-600">regístrate</span>{" "}
              para comenzar a usar nuestras herramientas.
            </p>

            <p className="text-lg leading-relaxed text-justify text-gray-800 lg:text-xl xl:text-2xl">
              Disfruta de un servicio personalizado que te permitirá organizar
              las consultas según tus necesidades y las de tu familia.
            </p>
          </div>

          <p className="mx-auto mt-16 text-xl italic font-semibold tracking-wide text-center text-blue-600 lg:text-2xl xl:text-3xl">
            ¡Gracias por elegirnos!
          </p>
        </div>

        <div className="w-full max-w-sm xl:max-w-2xl md:mr-4">
          <div className="p-5 mt-10 mb-10 border-2 border-black rounded shadow-xl mx:mt-0 border-opacity-30">
            <SignInForm />
          </div>
        </div>
      </div>

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
