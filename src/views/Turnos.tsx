import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Turno, TurnoData } from '../types';
import FormTurno from '../components/forms/FormTurno';
import ConfirmTurnoModal from '@/components/modals/turnos/ConfirmTurnoModal';

export default function Turnos() {
  const navigate = useNavigate();

  const [turnoData, setTurnoData] = useState<TurnoData | null>(null);

  const { register, setValue, reset, watch } = useForm<Turno>({
    defaultValues: {
      idEspecialidad: '',
      nombreEspecialidad: '',
      idDoctor: '',
      nombreDoctor: '',
      fecha: '',
      turno: 0,
      horaTurno: '',
    },
  });

  const handleSolicitar = () => {
    setTurnoData({
      nombreEspecialidad: watch('nombreEspecialidad'),
      nombreDoctor: watch('nombreDoctor'),
      fecha: watch('fecha'),
      turno: watch('turno'),
      horaTurno: watch('horaTurno'),
    });
    navigate(`${location.pathname}?confirmarTurno=true`);
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <div className="flex justify-center relative">
      <div className="absolute mt-5 left-5 top-1/3">
        <Link
          to="/inicio"
          className="py-1 px-6 text-sm font-semibold bg-gray-700 hover:bg-gray-800 text-white transition duration-200"
        >
          Volver
        </Link>
      </div>
      <div className="p-6 pb-10 w-full max-w-4xl h-full  my-5 bg-blue-800 shadow-xl border border-black border-opacity-20 rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-200 underline uppercase mb-4">
            Turnos Online
          </h2>
          <p className="mt-6 mb-8 text-lg text-gray-200">
            Selecciona especialidad y profesional para buscar disponibilidad de turnos
          </p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormTurno register={register} setValue={setValue} reset={reset} watch={watch} />

          <div className="flex justify-center w-full">
            <button
              type="button" // No es un submit, solo un botón que maneja la acción
              className={`p-3 mt-8 max-w-md w-full text-lg uppercase font-semibold rounded-lg  transition duration-200 ${
                watch('turno') === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 cursor-pointer text-white'
              }`}
              onClick={handleSolicitar}
              // disabled={watch('turno') === 0}
            >
              Solicitar
            </button>
          </div>
        </form>
      </div>
      <ConfirmTurnoModal turnoData={turnoData} />
    </div>
  );
}

{
  /* <input
              type="submit"
              value="Solicitar"
              disabled={watch('turno') === 0} // Deshabilita si no hay turno seleccionado
              className={`p-3 mt-8 max-w-md w-full text-lg uppercase font-semibold rounded-lg  transition duration-200 ${
                watch('turno') === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 cursor-pointer text-white'
              }`}
            /> */
}
