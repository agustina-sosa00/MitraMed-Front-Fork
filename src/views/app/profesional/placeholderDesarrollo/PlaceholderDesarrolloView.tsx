// export default function PlaceHolderDesarrolloView() {
//   return (
//     <div>
//       <div className="">PlaceHolderDesarrolloView</div>
//     </div>
//   );
// }
import { Link } from "react-router-dom";

export default function PlaceHolderDesarrolloView() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="flex flex-col items-center gap-6 p-10 bg-white/95 rounded-2xl shadow-2xl border border-gray-200 max-w-lg w-full">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-gray-800 mb-1 text-center drop-shadow">
          Área en Desarrollo...
        </h1>
        <img
          src="/icons/programmer.png"
          alt="programmer"
          className="w-24 h-24 mb-2 drop-shadow-lg"
        />
        <p className="text-gray-700 text-lg text-center max-w-md">
          Esta sección aún no está disponible.
          <br />
          Nuestro equipo está desarrollando nuevas funcionalidades para mejorar tu experiencia.
        </p>
        <p className="text-gray-500 text-center mt-1 italic">¡Gracias por tu paciencia!</p>
        <Link
          to={"/dashboard/inicio"}
          className="mt-4 px-6 py-2 font-semibold text-white rounded-full bg-neutral-700 shadow hover:bg-neutral-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-400"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
