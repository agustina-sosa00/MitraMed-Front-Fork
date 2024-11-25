import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MisTurnos() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center relative min-h-full">
      <div className="absolute -top-5 left-1">
        <Link
          to="/inicio"
          className="py-2 px-4 text-xs sm:text-base font-semibold bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition duration-200"
        >
          Volver
        </Link>
      </div>
      <div className="p-6 pb-10 w-full max-w-4xl h-full  my-5 bg-blue-800 shadow-xl border border-black border-opacity-20 rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-200 underline uppercase mb-4">Mis turnos</h2>
          <p className="mt-6 mb-8 text-lg text-gray-200">Aquí podrás ver los turnos agendados</p>
        </div>
      </div>
    </div>
  );
}
