import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../components/Logo';
// import Nav from '../components/Nav';

export default function Layout() {
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

      <div>
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
