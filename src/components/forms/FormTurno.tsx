import { useQuery } from '@tanstack/react-query';
import { obtenerDoctores, obtenerEspecialidades } from '../../services/TurnosService';
import { useState } from 'react';
import { Doctor, Especialidad } from '../../types/index';

export default function FormTurno() {
  const [especialidadId, setEspecialidadId] = useState<string | null>(null);

  const { data: especialidades } = useQuery<Especialidad[], Error>({
    queryKey: ['especialidades'],
    queryFn: obtenerEspecialidades,
  });

  const { data: doctores, isLoading: loadingDoctores } = useQuery<Doctor[], Error>({
    queryKey: ['doctores', especialidadId], // Clave única para la consulta
    queryFn: () => obtenerDoctores(especialidadId as string), // Función para obtener doctores
    enabled: !!especialidadId, // Solo se ejecuta si especialidadId está definido
  });

  return (
    <>
      <div className="flex flex-col gap-3 max-w-xl my-5">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="especialidad"
            className="w-44 text-lg text-gray-800 font-semibold text-right"
          >
            Especialidad:
          </label>
          <select
            name="especialidad"
            id="especialidad"
            className="p-0.5 bg-white flex-1 ml-2 rounded text-base"
            onChange={(e) => setEspecialidadId(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            {especialidades?.map((especialidades) => (
              <option key={especialidades.idespecialidad} value={especialidades.idespecialidad}>
                {especialidades.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="especialidad"
            className="w-44 text-lg text-gray-800 font-semibold text-right"
          >
            Profesional:
          </label>
          <select
            name="especialidad"
            id="especialidad"
            className="p-0.5 bg-white flex-1 ml-2 rounded text-base"
          >
            <option value="">-- Seleccione --</option>
            {loadingDoctores ? (
              <option disabled>Cargando profesionales...</option> // Mensaje mientras se carga
            ) : (
              doctores?.map((doctor) => (
                <option key={doctor.iddoctor} value={doctor.iddoctor}>
                  {doctor.apellido.toUpperCase()}, {doctor.nombre}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
    </>
  );
}
