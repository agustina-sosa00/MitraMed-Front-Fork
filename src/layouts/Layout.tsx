import { Link, Outlet } from 'react-router-dom';
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

      <div className="h-full">
        <Outlet />
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

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} hideProgressBar={true} />
    </>
  );
}
