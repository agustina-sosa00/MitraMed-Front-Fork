import { Link } from 'react-router-dom';

export default function HomeView() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold italic my-5">¡Te damos la bienvenida!</h2>
        <p className="mx-3 text-xl font-medium text-slate-800">
          Aquí podrás realizar la gestión de tus turnos, ver los turnos agendados y ver el historial
          de turnos pasados.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:grid grid-cols-6 mt-10">
        <div className="col-span-3 p-5 mx-5 md:mx-16 max-w-3xl bg-gray-200 shadow-xl">
          <p className="text-center text-xl mb-5 font-medium">¿Quieres sacar un nuevo turno?</p>
          <Link
            to="/turnos"
            className="flex justify-center p-2 w-full bg-green-600 hover:bg-green-700 transition hover:shadow-lg"
          >
            <p className="text-lg md:text-xl text-white font-semibold uppercase">Turnos online</p>
          </Link>
        </div>

        <div className="col-span-3 p-5 mx-5 md:mx-16 max-w-3xl bg-gray-200 shadow-xl">
          <p className="text-center text-xl mb-5 font-medium">
            ¿Quieres ver tu historial de turnos agendados?
          </p>
          <Link
            to="/mis-turnos"
            className="flex justify-center p-2 w-full bg-green-600 hover:bg-green-700 transition hover:shadow-lg"
          >
            <p className="text-lg md:text-xl text-white font-semibold uppercase">Mis turnos</p>
          </Link>
        </div>
      </div>
    </>
  );
}
