import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-800 py-10 text-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Slogan */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl xl:text-4xl font-semibold text-amber-400 mb-4">MitraMed</h2>
          <p className="text-lg xl:text-2xl text-gray-300 mb-4">Sabemos como cuidarte.</p>
        </div>

        {/* Contact */}
        <div className="flex flex-col justify-center items-center xl:gap-y-2 md:items-start">
          <h3 className="text-xl xl:text-3xl font-semibold text-amber-400 mb-2 xl:mb-4">
            Contacto
          </h3>
          <div className="flex items-center text-gray-300 xl:text-xl mb-2">
            <FaPhoneAlt className="mr-2" />
            <p>+54 9 351 633-0700</p>
          </div>
          <div className="flex items-center text-gray-300 xl:text-xl mb-4">
            <FaEnvelope className="mr-2" />
            <p>contacto@mitramed.com</p>
          </div>
        </div>

        {/* Derechos Reservados */}
        <div className="flex flex-col justify-center items-center md:items-end">
          <p className="text-sm xl:text-xl text-gray-400 mb-2">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>
          <p className="text-sm xl:text-xl text-gray-400">
            Powered by{' '}
            <Link
              to="https://www.novagestion.com.ar/"
              target="_blank"
              className="text-amber-400 hover:text-amber-500 cursor-pointer transition"
            >
              Nova Software
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
