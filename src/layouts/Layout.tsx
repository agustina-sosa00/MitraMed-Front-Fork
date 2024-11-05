import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../components/Logo';
import Nav from '../components/Nav';

export default function Layout() {
  return (
    <>
      <header className="py-5 md:py-2">
        <div className="flex justify-between items-center mx-5 md:mx-10">
          <Logo />

          <div className="flex justify-evenly max-w-xl w-full ">
            <Nav />
          </div>
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

      <div className="h-full">
        <Outlet />
      </div>

      <footer className="bg-slate-600 py-5 mt-16">
        <p className="text-white text-center font-medium">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} hideProgressBar={true} />
    </>
  );
}
