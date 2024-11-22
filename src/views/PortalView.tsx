import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SignInForm from '@/components/forms/SignInForm';
import CreateAccountModal from '@/components/modals/auth/CreateAccountModal';
import ConfirmAccountModal from '@/components/modals/auth/ConfirmAccountModal';
import ForgotPasswordModal from '@/components/modals/auth/ForgotPasswordModal';
import NewPasswordModal from '@/components/modals/auth/NewPasswordModal';
import NewTokenConfirm from '@/components/modals/auth/NewTokenConfirm';
import CarrouselPortal from '@/components/CarrouselPortal';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

export default function PortalView() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      navigate('/inicio'); // Redirige si el token existe
    }
  }, []);

  return (
    <>
      <Header />

      <CarrouselPortal />

      {/* Portal */}
      <div className="flex flex-col items-center lg:items-baseline mx:flex-row justify-between py-1 w-full mb-11">
        <div className="flex flex-col items-start space-y-6 lg:w-4/6 xl:max-w-4xl">
          <h2 className="text-2xl lg:text-4xl font-semibold lg:font-normal font-serif text-gray-800 text-center mb-6 mx-auto underline lg:decoration-4 underline-offset-4">
            MitraMed - Centro Médico
          </h2>

          <div className="space-y-6 ml-5 mr-8 indent-8 sm:mx-10 sm:indent-0 mx:indent-8">
            <p className="text-lg lg:text-xl text-gray-800 text-justify leading-relaxed">
              Bienvenido al portal de{' '}
              <span className="font-medium text-blue-600">reserva de turnos</span> para nuestro
              Centro Médico, donde podrás agendar tus consultas de forma rápida y sencilla.
            </p>

            <p className="text-lg lg:text-xl text-gray-800 text-justify leading-relaxed">
              Para disfrutar de todas las funciones,{' '}
              <span className="underline decoration-amber-500 decoration-2 underline-offset-2 font-medium">
                inicia sesión en tu cuenta
              </span>
              . Si aún no tienes una,{' '}
              <span className="text-blue-600 font-semibold">regístrate</span> para comenzar a usar
              nuestras herramientas.
            </p>

            <p className="text-lg lg:text-xl text-gray-800 text-justify leading-relaxed">
              Disfruta de un servicio personalizado que te permitirá organizar las consultas según
              tus necesidades y las de tu familia.
            </p>
          </div>

          <p className="text-xl lg:text-2xl italic text-center mt-16 font-semibold text-blue-600 tracking-wide mx-auto">
            ¡Gracias por elegirnos!
          </p>
        </div>

        <div className="max-w-sm w-full md:mr-4">
          <div className="mb-10 p-5 mt-10  mx:mt-0 border-2 border-black border-opacity-30 shadow-xl rounded">
            <SignInForm />
          </div>
        </div>
      </div>

      <Footer />

      <CreateAccountModal />
      <ForgotPasswordModal />
      <ConfirmAccountModal />
      <NewPasswordModal />
      <NewTokenConfirm />
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} hideProgressBar={true} />
    </>
  );
}

{
  /* <div className="relative h-60 lg:h-32 w-full">
        <div className="absolute inset-0">
          <img
            src="/img/centro-medico-recepcion.jpeg"
            alt="Centro Medico Edificio"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>
      </div> */
}
