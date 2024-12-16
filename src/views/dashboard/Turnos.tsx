import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Turno } from '@/types/index';
import FormTurno from '@/components/features/forms/FormTurno';
import ConfirmTurnoModal from '@/components/features/modals/ConfirmTurnoModal';

export default function Turnos() {
  const navigate = useNavigate();

  const [turnoData, setTurnoData] = useState<Turno | null>(null);

  const { register, setValue, getValues, reset, watch } = useForm<Turno>({
    defaultValues: {
      idEspecialidad: '',
      nombreEspecialidad: '',
      idDoctor: '',
      nombreDoctor: '',
      fecha: '',
      turno: 0,
      idhorario: 0,
      hora_ini: '',
      hora_fin: '',
    },
  });

  const handleSolicitar = () => {
    setTurnoData({
      idEspecialidad: watch('idEspecialidad'),
      nombreEspecialidad: watch('nombreEspecialidad'),
      idDoctor: watch('idDoctor'),
      nombreDoctor: watch('nombreDoctor'),
      fecha: watch('fecha'),
      turno: watch('turno'),
      idhorario: watch('idhorario'),
      hora_ini: watch('hora_ini'),
      hora_fin: watch('hora_fin'),
    });
    navigate(`${location.pathname}?confirmarTurno=true`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    reset();
  }, []);

  return (
    <div className="flex justify-center sm:min-h-screen lg:min-h-full mx-4 relative">
      <div className="absolute -top-5 left-1">
        <Link
          to="/inicio"
          className="py-2 px-4 text-xs sm:text-base font-semibold bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition duration-200"
        >
          Volver
        </Link>
      </div>
      <div className=" w-full max-w-4xl h-full my-5 bg-blue-800 shadow-xl border border-black border-opacity-20 rounded-lg">
        <div className="my-4 sm:p-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-200 underline uppercase">
            Turnos Online
          </h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-gray-200">
            Selecciona especialidad y profesional para buscar disponibilidad de turnos
          </p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormTurno
            register={register}
            setValue={setValue}
            getValues={getValues}
            reset={reset}
            watch={watch}
          />

          <div className="flex justify-center w-full p-2 ">
            <button
              type="button"
              className={`p-3 mt-8 max-w-md w-full text-lg uppercase font-semibold rounded-lg  transition duration-200 ${
                watch('turno') === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 cursor-pointer text-white'
              }`}
              onClick={handleSolicitar}
              disabled={watch('turno') === 0}
            >
              Solicitar
            </button>
          </div>
        </form>
      </div>
      {turnoData && <ConfirmTurnoModal turnoData={turnoData} setValue={setValue} />}
    </div>
  );
}
