import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Select, { SingleValue } from 'react-select';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaCalendarAlt } from 'react-icons/fa';
import { registerLocale } from 'react-datepicker';
import { UseFormRegister, UseFormReset, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Doctor, Especialidad, Horario, Turno } from '../../types/index';
import { es } from 'date-fns/locale/es';
import {
  obtenerDiasSinAtencion,
  obtenerDoctores,
  obtenerEspecialidades,
  obtenerTurnos,
} from '../../services/TurnosService';

type FormTurnoProps = {
  register: UseFormRegister<Turno>;
  setValue: UseFormSetValue<Turno>;
  reset: UseFormReset<Turno>;
  watch: UseFormWatch<Turno>;
};

export default function FormTurno({ register, setValue, reset, watch }: FormTurnoProps) {
  // const [idEspecialidad, setIdespecialidad] = useState<string>('');
  // const [idDoctor, setIddoctor] = useState<string>('');
  // const [fechaState, setFechaState] = useState<Date | null>(null);
  // console.log(fechaState);
  const idEspecialidad = watch('idEspecialidad');
  const idDoctor = watch('idDoctor');
  const fecha = watch('fecha');
  const turnoSeleccionado = watch('turno');

  const fechaDeshabilitada = !idEspecialidad || !idDoctor;

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1); // Fecha de mañana

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1); // Fecha de un mes

  registerLocale('es', es); // Idioma español

  // Consultas al Backend con useQuery
  const { data: especialidades, isLoading: loadingEspecialidades } = useQuery<
    Especialidad[],
    Error
  >({
    queryKey: ['especialidades'],
    queryFn: obtenerEspecialidades,
  });

  // console.log('idEspecialidad desde useForm:', idEspecialidad);

  const { data: doctores, isLoading: loadingDoctores } = useQuery<Doctor[], Error>({
    queryKey: ['doctores', idEspecialidad],
    queryFn: () => obtenerDoctores(idEspecialidad),
    enabled: !!idEspecialidad,
  });

  // console.log('idEspecialidad para useQuery:', idEspecialidad);

  const { data: diasSinAtencion } = useQuery<number[], Error>({
    queryKey: ['dias-sinatencion', idEspecialidad, idDoctor],
    queryFn: () => obtenerDiasSinAtencion({ idEspecialidad, idDoctor }),
    enabled: !!idEspecialidad && !!idDoctor,
    initialData: [],
  });

  const { data: turnos, isLoading: isLoadingTurnos } = useQuery<Horario[], Error>({
    queryKey: ['turnos', idEspecialidad, idDoctor, fecha],
    queryFn: () => obtenerTurnos({ idEspecialidad, idDoctor, fecha }),
    enabled: !!idEspecialidad && !!idDoctor && !!fecha,
  });

  // Estructura las opciones para los select
  const especialidadOptions = especialidades?.map((esp) => ({
    value: esp.idespecialidad.toString(),
    label: esp.nombre,
  }));

  const doctorOptions = doctores?.map((doc) => ({
    value: doc.iddoctor.toString(),
    label: `${doc.apellido.toUpperCase()}, ${doc.nombre}`,
  }));

  const handleEspecialidad = (e: SingleValue<{ value: string; label: string }>) => {
    setValue('idEspecialidad', e?.value || ''); // Actualiza el valor en useForm
    // console.log('Especialidad seleccionada:', e?.value);
    setValue('idDoctor', ''); // Limpiar el doctor al cambiar especialidad
  };

  const handleDoctor = (e: SingleValue<{ value: string; label: string }>) => {
    setValue('idDoctor', e?.value || '');
  };

  const handleFecha = (date: Date | null) => {
    if (date) {
      // Ajustar la fecha a la zona horaria local
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const formattedDate = localDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      console.log('Fecha: ', formattedDate);
      setValue('fecha', formattedDate); // Actualizamos el valor en useForm
    } else {
      setValue('fecha', ''); // En caso de que la fecha sea null
    }
  };

  // const handleFecha = (date: Date | null) => {
  //   setFechaState(date); // Mantén la fecha original en el estado local

  //   // Si la fecha es válida, la formateas a YYYY-MM-DD y la guardas en useForm
  //   const formattedDate = date ? date.toISOString().split('T')[0] : '';
  //   // setValue('fecha', formattedDate); // Guarda la fecha formateada en el formulario
  //   console.log(formattedDate);
  // };

  // Control cuando se vacía especialidad o doctor
  // useEffect(() => {
  //   if (!idEspecialidad || !idDoctor) {
  //     reset({
  //       fecha: '',
  //       turno: 0,
  //     });
  //   }
  // }, [idEspecialidad, idDoctor, reset]);

  return (
    <>
      <div className="flex flex-col items-start gap-3 my-5 ml-16">
        <div className="flex items-center justify-between gap-2 max-w-xl ">
          <label className="w-44 text-lg text-gray-200 font-semibold text-right ">
            Especialidad:
          </label>

          <Select
            {...register('idEspecialidad')}
            options={especialidadOptions}
            onChange={handleEspecialidad}
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
          <label className="w-44 text-lg text-gray-200 font-semibold text-right">
            Profesional:
          </label>
          <Select
            {...register('idDoctor')}
            options={doctorOptions}
            onChange={handleDoctor}
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
          <label className="w-44 text-lg text-gray-200 font-semibold text-right">Fecha:</label>

          <DatePicker
            selected={fecha ? new Date(fecha + 'T00:00:00') : null} // Convierte a Date si es una cadena válida
            onChange={handleFecha} // Cambia la fecha
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Selecciona una fecha"
            disabled={fechaDeshabilitada}
            filterDate={(date) =>
              !diasSinAtencion.includes(date.getDay()) && date.getDay() !== 0 && date.getDay() !== 6
            }
            dayClassName={(date) =>
              date.getDay() === 0 || date.getDay() === 6 ? 'fin-de-semana' : ''
            }
            toggleCalendarOnIconClick
            locale="es"
            dateFormat="dd/MM/yyy"
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

        {fecha && (
          <div className="flex items-start justify-between gap-2">
            <label className="w-44 text-lg text-gray-200 font-semibold text-right">Horarios:</label>

            <div className="w-[500px] h-full text-sm ml-2 bg-gray-100 border border-gray-400 overflow-x-auto rounded-md">
              <div className="text-gray-500 border-b border-gray-400 text-center">
                <div className="grid grid-cols-4 text-gray-700 font-semibold bg-gray-400 py-1 px-2 border-b border-gray-400">
                  <div>N° Turno</div>
                  <div>Hora Inicio</div>
                  <div>Hora Fin</div>
                  <div>Disponibilidad</div>
                </div>

                {isLoadingTurnos ? (
                  <div className="col-span-4 text-center py-4 text-gray-500">
                    Cargando turnos...
                  </div>
                ) : (
                  turnos?.map((turno, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-4 text-center border-b border-gray-400 relative ${
                        turno.habilitado === 0 ? 'cursor-pointer' : 'cursor-not-allowed'
                      } ${
                        turnoSeleccionado === index && turno.habilitado === 0
                          ? 'bg-blue-500 bg-opacity-40'
                          : 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300'
                      }`}
                      onClick={() => {
                        if (turno.habilitado === 0) {
                          setValue('turno', index);
                        }
                      }}
                    >
                      {/* Fila con los valores */}
                      <div className="p-1 border-r ">{index + 1}</div>
                      <div className="p-1 border-r">{turno.hora_ini}</div>
                      <div className="p-1 border-r">{turno.hora_fin}</div>
                      <div className="p-1">
                        {turno.habilitado === 0 ? (
                          <span className="font-medium text-green-500">Disponible</span>
                        ) : (
                          <span className="font-medium text-red-500">No Disponible</span>
                        )}
                      </div>

                      {/* Contenedor para el hover */}
                      <div
                        className={`absolute inset-0 bg-transparent ${
                          turno.habilitado === 0
                            ? ' hover:bg-blue-500 hover:bg-opacity-30'
                            : 'hover:bg-red-500 hover:bg-opacity-30'
                        } transition duration-300 ease-in-out z-10`}
                      ></div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
