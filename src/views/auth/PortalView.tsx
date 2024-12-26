import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import SignInForm from '@/components/features/forms/SignInForm';
import CreateAccountModal from '@/components/features/modals/CreateAccountModal';
import ConfirmAccountModal from '@/components/features/modals/ConfirmAccountModal';
import ForgotPasswordModal from '@/components/features/modals/ForgotPasswordModal';
import NewPasswordModal from '@/components/features/modals/NewPasswordModal';
import NewTokenConfirm from '@/components/features/modals/NewTokenConfirm';
import CarrouselPortal from '@/components/ui/CarrouselPortal';
import GoogleAuthModal from '@/components/features/modals/GoogleAuthModal';
import WhatsApp from '@/components/features/WhatsApp';

export default function PortalView() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has('google_auth')) {
      if (queryParams.has('code')) {
        return;
      }
    }

    if (!queryParams.has('confirmar_cuenta')) {
      if (queryParams.has('reestablecer_password')) {
        return;
      }

      if (accessToken) {
        navigate('/inicio');
      }
      if (!accessToken || !refreshToken) {
        navigate('/');
      }
    }
  }, []);

  return (
    <>
      <Header />

      <CarrouselPortal />

      {/* Portal */}
      <div className="flex flex-col items-center lg:items-baseline mx:flex-row justify-between py-1 w-full mb-11">
        <div className="flex flex-col items-start space-y-6 lg:w-4/6 xl:max-w-6xl">
          <h2 className="text-2xl lg:text-4xl font-semibold lg:font-normal font-serif text-gray-800 text-center mb-6 mx-auto underline lg:decoration-4 underline-offset-4">
            MitraMed - Centro Médico
          </h2>

          <div className="space-y-6 ml-5 mr-8 indent-8 sm:mx-10 sm:indent-0 mx:indent-8">
            <p className="text-lg lg:text-xl xl:text-2xl text-gray-800 text-justify leading-relaxed">
              Bienvenido al portal de{' '}
              <span className="font-medium text-blue-600">reserva de turnos</span> para nuestro
              Centro Médico, donde podrás agendar tus consultas de forma rápida y sencilla.
            </p>

            <p className="text-lg lg:text-xl xl:text-2xl text-gray-800 text-justify leading-relaxed">
              Para disfrutar de todas las funciones,{' '}
              <span className="underline decoration-amber-500 decoration-2 underline-offset-2 font-medium">
                inicia sesión en tu cuenta
              </span>
              . Si aún no tienes una,{' '}
              <span className="text-blue-600 font-semibold">regístrate</span> para comenzar a usar
              nuestras herramientas.
            </p>

            <p className="text-lg lg:text-xl xl:text-2xl text-gray-800 text-justify leading-relaxed">
              Disfruta de un servicio personalizado que te permitirá organizar las consultas según
              tus necesidades y las de tu familia.
            </p>
          </div>

          <p className="text-xl lg:text-2xl xl:text-3xl italic text-center mt-16 font-semibold text-blue-600 tracking-wide mx-auto">
            ¡Gracias por elegirnos!
          </p>
        </div>

        <div className="max-w-sm xl:max-w-2xl w-full md:mr-4">
          <div className="mb-10 p-5 mt-10  mx:mt-0 border-2 border-black border-opacity-30 shadow-xl rounded">
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
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} hideProgressBar={true} />
    </>
  );
}
