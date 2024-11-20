import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmAccountModal from '../components/modals/ConfirmAccountModal';
import CreateAccountModal from '../components/modals/CreateAccountModal';
import ForgotPasswordModal from '../components/modals/ForgotPasswordModal';
import SignInForm from '../components/forms/SignInForm';
import Logo from '../components/Logo';
import NewPasswordModal from '../components/modals/NewPasswordModal';
import NewTokenConfirm from '@/components/modals/NewTokenConfirm';
import { Link } from 'react-router-dom';

export default function PortalView() {
  return (
    <>
      <header className="py-5 md:py-2">
        <div className="flex justify-between items-center mx-5 md:mx-10">
          <div className="">
            <Logo />
          </div>

          <div className="flex justify-center items-center px-3 md:px-10 h-12 md:text-lg border border-gray-400 bg-gray-100">
            Tel: +9 54 999 9999 99
          </div>
          {/* <div className="flex items-center mr-10">
            <Nav />
          </div> */}
        </div>
      </header>

      {/* Background Image */}
      <div className="relative h-60 lg:h-32 w-full">
        <div className="absolute inset-0">
          <img
            src="/img/centro-medico-recepcion.jpeg"
            alt="Centro Medico Edificio"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>
      </div>

      {/* Portal */}
      <div className="flex flex-col items-center md:items-start md:grid md:grid-cols-5 w-full gap-4 md:gap-0 lg:px-5 lg:py-3">
        <div className="col-span-3 mt-5 lg:mt-2 px-6 space-y-8">
          <h2 className="text-3xl font-bold text-center lg:text-left text-gray-800 mb-8 underline  decoration-4 underline-offset-4">
            MitraMed - Centro Médico
          </h2>

          <div className="space-y-8 ">
            <p className="text-gray-800 text-lg lg:text-xl text-justify lg:text-left indent-6 leading-relaxed">
              Este portal facilita la{' '}
              <span className="font-medium text-blue-600">reserva de turnos</span> en nuestro Centro
              Médico, permitiéndote agendar tus consultas de forma rápida y sencilla.
            </p>

            <p className="text-gray-800 text-lg lg:text-xl text-justify lg:text-left indent-6 leading-relaxed">
              Para acceder a todas nuestras opciones, es necesario{' '}
              <span className="underline decoration-amber-500 decoration-2 underline-offset-2 font-medium">
                iniciar sesión en tu cuenta
              </span>
              . Si aún no tienes una,{' '}
              <span className="text-blue-600 font-semibold">regístrate</span> para comenzar a usar
              la plataforma.
            </p>

            <p className="text-gray-800 text-lg lg:text-xl text-justify lg:text-left indent-6 leading-relaxed">
              Nuestro servicio personalizado te permite planificar tus visitas de acuerdo a tus
              necesidades y las de tu familia.
            </p>
          </div>

          <p className="text-2xl italic text-center mt-10 font-semibold text-blue-600 tracking-wide">
            ¡Gracias por elegirnos para tu atención médica!
          </p>
        </div>

        <div className="md:col-span-2 w-96 md:w-full my-5 mx-2 md:max-w-sm lg:max-w-xl md:mt-2 px-4 md:p-1 border-2 border-slate-400">
          <SignInForm />
        </div>
      </div>

      <footer className="bg-slate-700 py-5">
        <p className="text-white text-center font-medium">
          Todos los derechos reservados {new Date().getFullYear()} - Desarrollado por{' '}
          <Link
            to="https://www.novagestion.com.ar/"
            target="_blank"
            className="text-amber-400 hover:text-amber-500 cursor-pointer transition"
          >
            Nova Software
          </Link>
        </p>
      </footer>

      <CreateAccountModal />
      <ForgotPasswordModal />
      <ConfirmAccountModal />
      <NewPasswordModal />
      <NewTokenConfirm />
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} hideProgressBar={true} />
    </>
  );
}
