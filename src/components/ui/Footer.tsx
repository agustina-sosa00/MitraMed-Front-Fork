import { FaWhatsapp, FaEnvelope, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Footer() {
  const handleCopyEmail = () => {
    const email = "mitramed.docta@gmail.com";
    navigator.clipboard.writeText(email).then(
      () => {
        toast.success("¡Correo copiado al portapapeles!");
      },
      (err) => {
        console.error("Error al copiar el correo: ", err);
      }
    );
  };
  return (
    <footer className="flex items-center justify-center w-full py-10 text-white bg-slate-800">
      <div className="w-[80%] flex flex-col gap-5">
        <div className="flex flex-col items-start w-full gap-5 md:gap-0 md:flex-row justify-evenly">
          {/* Slogan */}
          <div className="flex flex-col items-start justify-center ">
            <h2 className="text-3xl font-semibold text-green">MitraMed</h2>
            <p className="text-lg text-gray-300 ">Sabemos como cuidarte.</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start justify-center gap-2 ">
            <h3 className="text-lg font-semibold text-green">Contacto</h3>
            <div className="flex items-center gap-1 text-base text-gray-300 hover:text-greenFocus">
              <FaWhatsapp className="" />
              <a
                href="https://wa.me/5493516330700"
                target="_blank"
                rel="noopener noreferrer"
              >
                +549 351633-0700
              </a>
            </div>

            <div className="flex items-center justify-center gap-1 text-base text-gray-300 hover:text-greenFocus">
              <FaInstagram className="" />
              <a href="https://www.instagram.com/mitramed.docta?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                mitramed.docta
              </a>
            </div>
            <div className="flex items-center gap-1 text-base text-gray-300 hover:text-greenFocus">
              <FaEnvelope className="" />
              <button onClick={handleCopyEmail}>
                mitramed.docta@gmail.com
              </button>
            </div>
          </div>

          {/* Derechos Reservados */}
          <div className="flex flex-col items-start justify-center gap-2 ">
            <h3 className="text-lg font-semibold text-green ">
              Información legal
            </h3>
            <div className="flex flex-col items-start gap-1 text-gray-300 hover:text-greenFocus">
              <Link
                to="/privacy-policy"
                className="flex flex-col items-center gap-1 text-base text-gray-300 hover:text-greenFocus"
              >
                Política de privacidad
              </Link>
              <Link
                to="/terms-of-service"
                className="flex flex-col items-center gap-1 text-base text-gray-300 hover:text-greenFocus"
              >
                Términos de servicio
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full gap-2 py-5 border-t border-gray-400">
          <p className="text-lg text-gray-400 ">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>
          <p className="text-lg text-gray-400 ">
            Powered by{" "}
            <Link
              to="https://www.novagestion.com.ar/"
              target="_blank"
              className="transition cursor-pointer text-greenFocus hover:text-green"
            >
              Nova Software
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
