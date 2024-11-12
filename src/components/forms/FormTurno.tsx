import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { obtenerDoctores, obtenerEspecialidades } from '../../services/TurnosService';
import { Doctor, Especialidad } from '../../types/index';
import { FaCalendarAlt } from 'react-icons/fa';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { es } from 'date-fns/locale/es';
// import { getDateFromIddia } from '../../utils/index';

export default function FormTurno() {
  const [idEspecialidad, setIdespecialidad] = useState<string>('');
  const [idDoctor, setIddoctor] = useState<string>('');
  const [fecha, setFecha] = useState<Date | null>(null);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const fechaDeshabilitada = !idEspecialidad || !idDoctor;

  // Controlar cuando se vacíen idEspecialidad o idDoctor
  useEffect(() => {
    if (!idEspecialidad || !idDoctor) {
      setFecha(null); // Limpiar la fecha si no hay especialidad ni doctor
    }
  }, [idEspecialidad, idDoctor]);

  registerLocale('es', es); // Registra el idioma español

  console.log(idDoctor);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { data: especialidades, isLoading: loadingEspecialidades } = useQuery<
    Especialidad[],
    Error
  >({
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

  // Estructura las opciones para los select
  const especialidadOptions = especialidades?.map((esp) => ({
    value: esp.idespecialidad.toString(),
    label: esp.nombre,
  }));

  const doctorOptions = doctores?.map((doc) => ({
    value: doc.iddoctor.toString(),
    label: `${doc.apellido.toUpperCase()}, ${doc.nombre}`,
  }));

  return (
    <div className="flex justify-center mr-32">
      <div className="flex flex-col items-start gap-3 my-5 ">
        <div className="flex items-center justify-between gap-2 max-w-xl ">
          <label
            htmlFor="especialidad"
            className="w-44 text-lg text-gray-200 font-semibold text-right "
          >
            Especialidad:
          </label>

          <Select
            options={especialidadOptions}
            onChange={(e) => {
              setIdespecialidad(e?.value || '');
              setIddoctor('');
            }}
            value={especialidadOptions?.find((opt) => opt.value === idEspecialidad)}
            placeholder="Selecciona una especialidad"
            isClearable
            isLoading={loadingEspecialidades}
            loadingMessage={() => 'Cargando especialidades...'}
            className="w-72 border-0 text-sm placeholder:text-gray-300 ml-2 focus:outline-none focus:ring-0"
            styles={{
              control: (provided) => ({ ...provided, boxShadow: 'none' }),
              placeholder: (provided) => ({
                ...provided,
                color: '#A0A0A0', // Gris un poco menos oscuro
              }),
            }}
          />
        </div>

        <div className="flex items-center justify-between gap-2 max-w-xl">
          <label htmlFor="doctor" className="w-44 text-lg text-gray-200 font-semibold text-right">
            Profesional:
          </label>
          <Select
            options={doctorOptions}
            onChange={(e) => setIddoctor(e?.value || '')}
            value={idDoctor ? doctorOptions?.find((opt) => opt.value === idDoctor) : null}
            placeholder="Selecciona un doctor"
            noOptionsMessage={() => 'Sin opciones'}
            isClearable
            isLoading={loadingDoctores}
            loadingMessage={() => 'Cargando doctores...'}
            className="w-72 border-0 text-sm  ml-2 focus:outline-none focus:ring-0"
            styles={{
              control: (provided) => ({ ...provided, boxShadow: 'none' }),
              placeholder: (provided) => ({
                ...provided,
                color: '#A0A0A0', // Gris un poco menos oscuro
              }),
            }}
          />
        </div>

        <div className="flex items-center justify-between gap-2 max-w-xl">
          <label htmlFor="fecha" className="w-44 text-lg text-gray-200 font-semibold text-right">
            Fecha:
          </label>

          <DatePicker
            selected={fecha} // Fecha seleccionada
            onChange={(date) => setFecha(date)} // Cambia la fecha
            minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
            placeholderText="Selecciona una fecha"
            disabled={fechaDeshabilitada}
            toggleCalendarOnIconClick
            locale="es"
            dateFormat="dd 'de' MMMM 'de' yyyy"
            showIcon
            icon={
              <FaCalendarAlt
                className={`absolute right-1 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 ${
                  fechaDeshabilitada ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'
                }`}
              />
            }
            className={`w-72 border border-neutral-400 border-opacity-60 bg-white rounded text-sm ml-2 pl-3 ${
              fechaDeshabilitada ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
          />
        </div>

        <div className="flex items-center justify-between gap-2  max-w-xl">
          <label htmlFor="horario" className="w-44 text-lg text-gray-200 font-semibold text-right">
            Horarios:
          </label>
          {/* <div className="bg-white flex-1 ml-2 rounded text-base border border-gray-300">
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
