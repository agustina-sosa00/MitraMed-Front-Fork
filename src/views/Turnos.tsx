import { Link } from 'react-router-dom';
import FormTurno from '../components/forms/FormTurno';

export default function Turnos() {
  return (
    <div className="flex justify-center relative">
      <div className="absolute mt-5 left-5 top-1/3">
        <Link
          to="/inicio"
          className="py-1 px-6 text-sm font-semibold bg-gray-700 hover:bg-gray-800 text-white transition duration-200"
        >
          Volver
        </Link>
      </div>
      <div className="p-6 pb-10 w-full max-w-4xl h-full  my-5 bg-blue-800 shadow-xl border border-black border-opacity-20 rounded-lg">
        {/* Botón de enlace para volver al inicio */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-200 underline uppercase mb-4">
            Turnos Online
          </h2>
          <p className="mt-6 mb-8 text-lg text-gray-200">
            Selecciona especialidad y profesional para buscar disponibilidad de turnos
          </p>
        </div>
        <form className="flex flex-col items-center">
          <FormTurno />
          <div className="flex justify-center w-full">
            <input
              type="submit"
              value="Solicitar"
              className="p-3 mt-8 max-w-lg w-full text-lg bg-green-600 hover:bg-green-700 text-white uppercase font-semibold rounded-lg cursor-pointer transition duration-200"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
