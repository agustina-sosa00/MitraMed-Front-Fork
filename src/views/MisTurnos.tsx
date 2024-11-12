import { Link } from 'react-router-dom';

export default function MisTurnos() {
  return (
    <div className="flex justify-center relative min-h-[530px]">
      <div className="absolute mt-5 left-5 top-1/3">
        <Link
          to="/inicio"
          className="py-1 px-6 text-sm font-semibold bg-gray-700 hover:bg-gray-800 text-white transition duration-200"
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
