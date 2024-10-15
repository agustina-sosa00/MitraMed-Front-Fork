import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmAccountModal from '../components/modals/ConfirmAccountModal';
import CreateAccountModal from '../components/modals/CreateAccountModal';
import ForgotPasswordModal from '../components/modals/ForgotPasswordModal';
import SignInForm from '../components/forms/SignInForm';
import Logo from '../components/Logo';
import NewPasswordModal from '../components/modals/NewPasswordModal';

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
      <div className="relative h-60 lg:h-40 w-full">
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
        <div className="col-span-3 mt-5 lg:mt-2 px-6">
          <h2 className="text-2xl font-semibold text-center lg:text-left text-gray-700 mb-5 underline">
            Mitra Med - Centro Médico
          </h2>
          <div className="lg:mt-10 space-y-4 lg:space-y-10">
            <p className="text-gray-700 text-lg text-justify lg:text-balance indent-4">
              Este portal está diseñado para facilitar la gestión de turnos en nuestro Centro
              Médico. Aquí, puedes reservar tus citas de manera rápida y sencilla.
            </p>
            <p className="text-gray-700 text-lg text-justify lg:text-balance indent-4">
              Para acceder a nuestras funcionalidades y poder{' '}
              <span className="underline underline-offset-2">gestionar tus turnos</span>, es
              necesario que inicies sesión en tu cuenta. Si aún no tienes una, te invitamos a
              registrarte para comenzar a utilizar nuestros servicios.
            </p>
            <p className="text-gray-700 text-lg text-justify lg:text-balance indent-4">
              Ofrecemos un servicio personalizado y eficiente para que puedas planificar tus visitas
              de acuerdo a tus necesidades y a las de tu familia.
            </p>
          </div>
          <p className="text-xl italic text-center mt-10 font-semibold text-blue-700">
            Gracias por elegirnos para tu atención médica!!!
          </p>
        </div>

        <div className="md:col-span-2 w-96 md:w-full my-5 mx-2 md:max-w-sm lg:max-w-xl md:mt-2 px-4 md:p-1 border-2 border-slate-400">
          <SignInForm />
        </div>
      </div>

      <footer className="bg-slate-600 py-5 mt-16">
        <p className="text-white text-center font-medium">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>

      <CreateAccountModal />
      <ForgotPasswordModal />
      <ConfirmAccountModal />
      <NewPasswordModal />
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} hideProgressBar={true} />
    </>
  );
}
