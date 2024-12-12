import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaCalendarAlt } from 'react-icons/fa';
import { registerLocale } from 'react-datepicker';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Doctor, Especialidad, Horario, Turno } from '../../../types/index';
import { es } from 'date-fns/locale/es';
import {
  obtenerDiasSinAtencion,
  obtenerDoctores,
  obtenerEspecialidades,
  obtenerTurnosDisponibles,
} from '../../../services/TurnosService';

type FormTurnoProps = {
  register: UseFormRegister<Turno>;
  setValue: UseFormSetValue<Turno>;
  getValues: UseFormGetValues<Turno>;
  reset: UseFormReset<Turno>;
  watch: UseFormWatch<Turno>;
};

export default function FormTurno({ register, setValue, getValues, reset, watch }: FormTurnoProps) {
  const idEspecialidad = watch('idEspecialidad');
  const idDoctor = watch('idDoctor');
  const fecha = watch('fecha');
  const turnoSeleccionado = watch('turno');

  const fechaDeshabilitada = !idEspecialidad || !idDoctor;

  const minDate = new Date();
  minDate.setDate(minDate.getDate());

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

  const { data: doctores, isLoading: loadingDoctores } = useQuery<Doctor[], Error>({
    queryKey: ['doctores', idEspecialidad],
    queryFn: () => obtenerDoctores(idEspecialidad),
    enabled: !!idEspecialidad,
  });

  const { data: diasSinAtencion } = useQuery<number[], Error>({
    queryKey: ['dias-sinatencion', idEspecialidad, idDoctor],
    queryFn: () => obtenerDiasSinAtencion({ idEspecialidad, idDoctor }),
    enabled: !!idEspecialidad && !!idDoctor,
    initialData: [],
  });

  console.log(diasSinAtencion);

  const { data: turnos, isLoading: isLoadingTurnos } = useQuery<Horario[], Error>({
    queryKey: ['turnos', idEspecialidad, idDoctor, fecha],
    queryFn: () => obtenerTurnosDisponibles({ idEspecialidad, idDoctor, fecha }),
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
    const especialidadValue = e?.value || '';

    setValue('idEspecialidad', especialidadValue);
    setValue('nombreEspecialidad', e?.label || '');

    // Limpiar campos dependientes siempre
    setValue('idDoctor', '');
    setValue('nombreDoctor', '');
    setValue('fecha', '');
    setValue('turno', 0);
  };

  const handleDoctor = (
    newValue: SingleValue<{ value: string; label: string }>,
    _: ActionMeta<{ value: string; label: string }>
  ) => {
    const doctorValue = newValue?.value || '';

    setValue('idDoctor', doctorValue);
    setValue('nombreDoctor', newValue?.label || '');

    // Limpiar campos dependientes siempre
    setValue('fecha', '');
    setValue('turno', 0);
  };

  const handleFecha = (date: Date | null) => {
    if (date) {
      // Ajustar la fecha a la zona horaria local
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const formattedDate = localDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      console.log('Fecha: ', formattedDate);
      setValue('fecha', formattedDate); // Actualizamos el valor en useForm
      // Reseteamos el valor del turno a 0
      setValue('turno', 0);
    } else {
      setValue('fecha', ''); // En caso de que la fecha sea null
      setValue('turno', 0); // Reseteamos el turno a 0 si no hay fecha
    }
  };

  useEffect(() => {
    if (!idEspecialidad || !idDoctor) {
      reset((formValues) => ({
        ...formValues,
        fecha: '',
        turno: 0,
      }));
    }
  }, [idEspecialidad, idDoctor, reset]);

  return (
    <>
      <div className="flex flex-col items-start gap-3 mt-5 sm:w-[430px] sm:ml-32 lg:ml-52">
        <div className="flex items-center justify-between gap-2 sm:w-[420px] relative">
          <label className="w-[90px] small:w-[110px] sm:text-lg text-gray-200 font-semibold text-right  ">
            Especialidad:
          </label>

          <Select
            {...register('idEspecialidad')}
            options={especialidadOptions}
            onChange={handleEspecialidad}
            value={especialidadOptions?.find((opt) => opt.value === watch('idEspecialidad'))}
            placeholder="Selecciona una especialidad"
            isClearable
            isSearchable={false}
            isLoading={loadingEspecialidades}
            loadingMessage={() => 'Cargando especialidades...'}
            className="w-40 small:w-48 mini:w-56 sm:w-72 border-0 text-sm placeholder:text-gray-300 ml-2 sm:ml-4 focus:outline-none focus:ring-0 bg-amber-200"
            styles={{
              control: (provided) => ({ ...provided, boxShadow: 'none' }),
              placeholder: (provided) => ({
                ...provided,
                color: '#A0A0A0', // Gris un poco menos oscuro
              }),
            }}
          />
        </div>

        <div className="flex items-center gap-2 sm:w-[420px]">
          <label className="w-[90px] small:w-[110px] sm:text-lg text-gray-200 font-semibold text-right  ">
            Profesional:
          </label>
          <Select
            {...register('idDoctor')}
            options={doctorOptions}
            onChange={handleDoctor}
            value={
              getValues('idDoctor') // Si existe un valor, mapea al objeto esperado
                ? { value: getValues('idDoctor'), label: getValues('nombreDoctor') }
                : null // Si no hay valor, pasa `null`
            }
            placeholder="Selecciona un doctor"
            noOptionsMessage={() => 'Sin opciones'}
            isClearable
            isSearchable={false}
            isLoading={loadingDoctores}
            loadingMessage={() => 'Cargando doctores...'}
            className="w-40 small:w-48 mini:w-56 sm:w-72 border-0 text-sm ml-2 sm:ml-4 focus:outline-none focus:ring-0 bg-blue-200"
            styles={{
              control: (provided) => ({ ...provided, boxShadow: 'none' }),
              placeholder: (provided) => ({
                ...provided,
                color: '#A0A0A0', // Gris un poco menos oscuro
              }),
            }}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-[420px] ml-2 sm:ml-4">
          <label className="w-[90px] small:w-[110px] pr-2 sm:pr-4 sm:text-lg text-gray-200 font-semibold text-right ">
            Fecha:
          </label>

          <DatePicker
            selected={fecha ? new Date(fecha + 'T00:00:00') : null} // Convierte a Date si es una cadena válida
            onChange={handleFecha} // Cambia la fecha
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Selecciona una fecha"
            disabled={fechaDeshabilitada}
            className={`w-40 small:w-48 mini:w-56 sm:w-72 text-sm border border-neutral-400 border-opacity-60 bg-white focus:outline-none focus:ring-0 ${
              fechaDeshabilitada ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            filterDate={(date) => diasSinAtencion.includes(date.getDay())}
            // dayClassName={(date) =>
            //   date.getDay() === 0 || date.getDay() === 6 ? 'fin-de-semana' : ''
            // }
            toggleCalendarOnIconClick
            locale="es"
            dateFormat="dd/MM/yyy"
            showIcon
            icon={
              <FaCalendarAlt
                className={`invisible small:visible absolute right-1 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 ${
                  fechaDeshabilitada ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'
                }`}
              />
            }
          />
        </div>

        {fecha && (
          <div className="flex items-start justify-center sm:justify-between gap-2 ">
            {/* <label className="hidden sm:flex sm:justify-end mr-2 w-[110px] sm:text-lg text-gray-200 font-semibold text-right ">
              Horarios:
            </label> */}

            <div className="sm:w-[500px] h-full text-sm mx-2 bg-gray-100 border border-gray-400 overflow-x-auto rounded-md">
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
                        turnoSeleccionado === index + 1 && turno.habilitado === 0
                          ? 'bg-blue-500 bg-opacity-40'
                          : 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300'
                      }`}
                      onClick={() => {
                        if (turno.habilitado === 0) {
                          setValue('turno', index + 1);
                          setValue('hora_ini', turno.hora_ini);
                          setValue('hora_fin', turno.hora_fin);
                        }
                      }}
                    >
                      {/* Fila con los valores */}
                      <div className="p-1 border-r ">{index + 1}</div>
                      <div className="p-1 border-r">{turno.hora_ini}</div>
                      <div className="p-1 border-r">{turno.hora_fin}</div>
                      <div className="p-1">
                        {turno.habilitado === 0 ? (
                          <span className="font-medium text-xs sm:text-base text-green-500">
                            Disponible
                          </span>
                        ) : (
                          <span className="font-medium text-xs sm:text-base text-red-500">
                            No Disponible
                          </span>
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
