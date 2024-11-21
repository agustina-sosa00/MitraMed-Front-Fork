import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomeView() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col items-center min-h-full mb-20">
      <div className="w-full py-20 px-6 text-center relative mb-10">
        <div
          className="absolute inset-0 bg-black bg-contain opacity-20"
          style={{ backgroundImage: 'url(/med/herramientas-1.jpg)' }}
        ></div>
        <div className="relative z-10">
          <h2 className="text-5xl font-extrabold text-green-600 mb-6">
            ¡Bienvenido a nuestra web oficial!
          </h2>
          <p className="text-xl font-medium text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Nos enorgullecemos de ofrecer atención médica personalizada y eficiente. Tu salud es
            nuestra prioridad, y nos comprometemos a brindarte un servicio de calidad, accesible y
            confiable.
          </p>
        </div>
      </div>

      {/* Sección de acciones */}
      <div className="flex justify-around mt-8 w-full gap-8 px-4 mb-10">
        <div className="max-w-xl w-full bg-blue-800 rounded-lg shadow-lg p-6 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-110 z-0 opacity-40"
            style={{
              backgroundImage: 'url(/med/doc-h.jpg)',
            }}
          ></div>

          <div className="relative z-10 w-fit mx-auto">
            <p className="text-2xl text-white font-semibold mb-4">¿Necesitas un turno?</p>
          </div>
          <div className="relative z-10 w-fit mx-auto">
            <p className="text-white mb-6">
              Agenda tu próxima consulta de forma rápida y sencilla.
            </p>
          </div>
          <div className="relative z-10 w-fit mx-auto">
            <Link
              to="/turnos"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              Gestionar Turnos
            </Link>
          </div>
        </div>

        {/* Card para ver turnos */}
        <div className="max-w-xl w-full bg-blue-800 rounded-lg shadow-lg p-6 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-110 z-0 opacity-30"
            style={{
              backgroundImage: 'url(/med/misturnos.jpg)',
            }}
          ></div>

          <div className="relative z-10 w-fit mx-auto">
            <p className="text-2xl text-white font-semibold mb-4">¿Quieres ver tus turnos?</p>
          </div>
          <div className="relative z-10 w-fit mx-auto">
            <p className="text-white mb-6">
              Consulta el historial de tus turnos reservados
              <br />y mantente al tanto de tus próximas citas.
            </p>
          </div>
          <div className="relative z-10 w-fit mx-auto">
            <Link
              to="/mis-turnos"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              Ver mis Turnos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
