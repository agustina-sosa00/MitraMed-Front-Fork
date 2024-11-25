import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MisTurnos() {
  const [loading, setLoading] = useState(true);
  const [showHistorial, setShowHistorial] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
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

      <div className="p-6 pb-10 w-full max-w-4xl h-full my-5 bg-blue-800 shadow-xl border border-black border-opacity-20 rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-200 underline uppercase mb-4">Mis turnos</h2>
          <p className="mt-4 text-lg text-gray-200">
            Aquí puedes alternar entre tus turnos pendientes y el historial de turnos agendados.
          </p>
          {loading ? (
            <div className="flex justify-center items-center mt-6">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowHistorial(true)}
                  className={`p-2 rounded-lg mx-2 transition ${
                    showHistorial ? 'bg-blue-600 text-white' : 'bg-gray-400 text-black'
                  }`}
                >
                  Historial de Turnos
                </button>
                <button
                  onClick={() => setShowHistorial(false)}
                  className={`p-2 rounded-lg mx-2 transition ${
                    !showHistorial ? 'bg-blue-600 text-white' : 'bg-gray-400 text-black'
                  }`}
                >
                  Turnos Pendientes
                </button>
              </div>
              {showHistorial ? (
                <div className="mt-6 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-300 text-gray-800 rounded-lg shadow-md border border-gray-300">
                    <div className="text-left">
                      <p className="text-sm">
                        <span className="font-semibold">Fecha:</span> 12/11/2024
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Hora:</span> 14:30
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Doctor:</span> Dr. Juan Pérez
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Especialidad:</span> Cardiología
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-white ${
                          true ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {true ? '✔ Asistió' : '✘ No Asistió'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-300 text-gray-800 rounded-lg shadow-md border border-gray-300">
                    <div className="text-left">
                      <p className="text-sm">
                        <span className="font-semibold">Fecha:</span> 14/11/2024
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Hora:</span> 08:30
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Doctor:</span> Dr. Ruben Romano
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Especialidad:</span> Odontología
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-white ${
                          false ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {false ? '✔ Asistió' : '✘ No Asistió'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-300 text-gray-800 rounded-lg shadow-md border border-gray-300">
                    <div className="text-left">
                      <p className="text-sm">
                        <span className="font-semibold">Fecha:</span> 18/11/2024
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Hora:</span> 10:00
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Doctor:</span> Dra. Laura Gómez
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Especialidad:</span> Pediatría
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200">
                        Anular
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-300 text-gray-800 rounded-lg shadow-md border border-gray-300">
                    <div className="text-left">
                      <p className="text-sm">
                        <span className="font-semibold">Fecha:</span> 22/11/2024
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Hora:</span> 15:45
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Doctor:</span> Dr. Mario López
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Especialidad:</span> Dermatología
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200">
                        Anular
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
