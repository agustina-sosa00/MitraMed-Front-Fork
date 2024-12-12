import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomeView() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = '/med/herramientas-1.webp';
    link.as = 'image';
    document.head.appendChild(link);

    window.scrollTo(0, 0);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div
      className={`flex flex-col items-center min-h-full mb-20 ${
        isLoading ? 'invisible' : 'visible'
      }`}
    >
      <div className="w-full py-20 px-6 text-center relative mb-10">
        <div
          className="absolute inset-0 bg-black opacity-20"
          style={{
            backgroundImage: 'url(/med/herramientas-1.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-green-600 mb-6">
            Tu salud, nuestra prioridad
          </h2>
          <p className="text-xl font-medium text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Estamos aquí para hacer tu experiencia más sencilla y conveniente. Nuestro compromiso es
            ofrecerte soluciones rápidas, seguras y adaptadas a tus necesidades.
          </p>
        </div>
      </div>

      {/* Sección de acciones */}
      <div className="flex flex-col items-center mx:flex-row mx:justify-around mt-8 w-full gap-8 px-4 mb-10">
        <div className="max-w-md lg:max-w-lg w-full min-h-60 bg-blue-800 rounded-lg shadow-lg p-6 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-110 z-0 opacity-20"
            style={{
              backgroundImage: 'url(/med/doc-3.webp)',
            }}
          ></div>

          <div className="relative z-10 w-fit mx-auto">
            <p className="text-2xl text-white font-semibold mb-4">¿Necesitas un turno?</p>
          </div>
          <div className="relative z-10 w-fit mx-auto">
            <p className="text-white mb-6">Agenda tu próxima consulta de rápida y eficazmente.</p>
          </div>
          <div className="relative z-10 w-fit mx-auto mt-12">
            <Link
              to="/turnos"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              Sacar un Turno
            </Link>
          </div>
        </div>

        <div className="max-w-md lg:max-w-lg w-full min-h-60 bg-blue-800 rounded-lg shadow-lg p-6 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-110 z-0 opacity-20"
            style={{
              backgroundImage: 'url(/med/doc-6.webp)',
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
