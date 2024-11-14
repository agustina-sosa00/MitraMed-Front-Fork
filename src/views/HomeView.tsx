import { Link } from 'react-router-dom';

export default function HomeView() {
  return (
    <div className="flex flex-col items-center min-h-full mb-20">
      {/* Sección de bienvenida */}
      <div className="text-center w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 p-8 shadow-xl mt-8">
        <h2 className="text-4xl font-bold text-green-300 mb-8">
          ¡Bienvenido a nuestro Centro Médico!
        </h2>
        <p className="text-lg font-medium text-gray-100 max-w-4xl mt-6 mb-4 mx-auto">
          Nos enorgullecemos de ofrecer una atención médica personalizada y eficiente, comprometidos
          con tu salud y la de tu familia. Nuestro objetivo es brindarte un servicio de calidad,
          confiable y accesible, porque tu bienestar es nuestra prioridad.
        </p>
      </div>

      {/* Sección de acciones */}
      <div className="flex justify-around mt-7 w-full">
        <div className="max-w-xl w-full bg-blue-800 rounded-lg shadow-lg p-6 text-center">
          <p className="text-2xl text-white font-semibold mb-4">¿Necesitas un turno?</p>
          <p className="text-white mb-6">
            Agenda tu próxima consulta de forma rápida y sencilla. Elige el horario que mejor se
            adapte a ti.
          </p>
          <Link
            to="/turnos"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300"
          >
            Gestionar Turnos
          </Link>
        </div>
        <div className="max-w-xl w-full bg-blue-800 rounded-lg shadow-lg p-6 text-center">
          <p className="text-2xl text-white font-semibold mb-4">¿Quieres ver tus turnos?</p>
          <p className="text-white mb-6">
            Consulta el historial de tus turnos reservados y mantente al tanto de tus próximas
            citas.
          </p>
          <Link
            to="/mis-turnos"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300"
          >
            Ver Mis Turnos
          </Link>
        </div>
      </div>
    </div>
  );
}
