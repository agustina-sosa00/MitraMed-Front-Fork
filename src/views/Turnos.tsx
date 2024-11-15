import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Turno } from '../types';
import FormTurno from '../components/forms/FormTurno';
import { useEffect } from 'react';

export default function Turnos() {
  // const [turnoSeleccionado, setTurnoSeleccionado] = useState<number | null>(null);

  const { register, setValue, reset, watch, handleSubmit } = useForm<Turno>({
    defaultValues: {
      idEspecialidad: '',
      idDoctor: '',
      fecha: '',
      horario: '',
      turno: 0,
    },
  });

  // En el efecto:
  useEffect(() => {
    reset(); // Restaura los valores predeterminados automáticamente
  }, []);

  return (
    // <div key={key}>
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
        {/* Botón de enlace para volver al inicio */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-200 underline uppercase mb-4">
            Turnos Online
          </h2>
          <p className="mt-6 mb-8 text-lg text-gray-200">
            Selecciona especialidad y profesional para buscar disponibilidad de turnos
          </p>
        </div>
        <form className="">
          <FormTurno register={register} setValue={setValue} reset={reset} watch={watch} />
          <div className="flex justify-center w-full">
            <input
              type="submit"
              value="Solicitar"
              disabled={watch('turno') === 0} // Deshabilita si no hay turno seleccionado
              className={`p-3 mt-8 max-w-md w-full text-lg uppercase font-semibold rounded-lg  transition duration-200 ${
                watch('turno') === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 cursor-pointer text-white'
              }`}
            />
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
}
