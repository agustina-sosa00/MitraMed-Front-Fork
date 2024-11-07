import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { obtenerDoctores, obtenerEspecialidades } from '../../services/TurnosService';
import { Doctor, Especialidad } from '../../types/index';
// import { getDateFromIddia } from '../../utils/index';

// Estado inicial con el día de mañana
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

export default function FormTurno() {
  const [idEspecialidad, setIdespecialidad] = useState<string>('');
  const [idDoctor, setiDdoctor] = useState<string>('');

  console.log(idDoctor);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { data: especialidades } = useQuery<Especialidad[], Error>({
    queryKey: ['especialidades'],
    queryFn: obtenerEspecialidades,
  });

  const { data: doctores, isLoading: loadingDoctores } = useQuery<Doctor[], Error>({
    queryKey: ['doctores', idEspecialidad],
    queryFn: () => obtenerDoctores(idEspecialidad as string),
    enabled: !!idEspecialidad,
  });

  // const { data: horarios, isLoading: loadingHorarios } = useQuery<Horario[], Error>({
  //   queryKey: ['horarios', idEspecialidad, idDoctor],
  //   queryFn: () => obtenerHorarios({ idEspecialidad, idDoctor }),
  //   enabled: !!idEspecialidad && !!idDoctor,
  //   initialData: [],
  // });

  // const [horario, setHorario] = useState([horarios]);

  // // Función para alternar la selección de la fila
  // const toggleRowSelection = (index: number) => {
  //   // const updatedHorarios = horario.map((hora, i) =>
  //   //   i === index ? { ...hora, selected: !hora.selected } : hora
  //   // );
  //   // setHorario(updatedHorarios);

  //   console.log(index);
  // };

  return (
    <>
      <div className="flex flex-col w-full gap-3 my-5">
        <div className="flex items-center justify-between gap-2 max-w-xl">
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
            onChange={(e) => setIdespecialidad(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            {especialidades?.map((especialidades) => (
              <option key={especialidades.idespecialidad} value={especialidades.idespecialidad}>
                {especialidades.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between gap-2  max-w-xl">
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
            onChange={(e) => setiDdoctor(e.target.value)}
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
        {/* <div className="flex items-center justify-between gap-2  max-w-xl">
          <label htmlFor="horario" className="w-44 text-lg text-gray-800 font-semibold text-right">
            Horarios:
          </label>
          <div className="bg-white flex-1 ml-2 rounded text-base border border-gray-300">
            <table className="w-full border border-gray-300 text-base bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border w-36">Fecha</th>
                  <th className="p-2 border w-16">Turno</th>
                  <th className="p-2 border w-24">Horario</th>
                  <th className="p-2 border">Disponible</th>
                </tr>
              </thead>
              <tbody>
                {loadingHorarios ? (
                  <tr>
                    <td>Cargando horarios...</td>
                  </tr> // Mensaje mientras se carga
                ) : (
                  horarios?.map((horario, index) => (
                    <tr
                      key={index}
                      className={`cursor-pointer ${horario.selected ? 'bg-blue-200' : ''}`}
                      onClick={() => toggleRowSelection(index)} // Cambiar fondo al hacer clic
                    >
                      <td className="p-1 border text-end">{getDateFromIddia(horario.iddia)}</td>
                      <td className="p-1 border text-end">{horario.idhorario}</td>
                      <td className="p-1 border text-end">
                        {new Date(horario.hora_ini).getUTCHours().toString().padStart(2, '0') +
                          ':' +
                          new Date(horario.hora_ini).getUTCMinutes().toString().padStart(2, '0')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </>
  );
}
