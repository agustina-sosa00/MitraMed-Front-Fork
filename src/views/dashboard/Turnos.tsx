import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Turno } from "@/types/index";
import FormTurno from "@/components/features/forms/FormTurno";
import ConfirmTurnoModal from "@/components/features/modals/ConfirmTurnoModal";

export default function Turnos() {
  const navigate = useNavigate();

  const [turnoData, setTurnoData] = useState<Turno | null>(null);

  const { register, setValue, getValues, reset, watch } = useForm<Turno>({
    defaultValues: {
      idEspecialidad: "",
      nombreEspecialidad: "",
      idDoctor: "",
      nombreDoctor: "",
      fecha: "",
      turno: 0,
      idhorario: 0,
      hora_ini: "",
      hora_fin: "",
    },
  });

  const handleSolicitar = () => {
    setTurnoData({
      idEspecialidad: watch("idEspecialidad"),
      nombreEspecialidad: watch("nombreEspecialidad"),
      idDoctor: watch("idDoctor"),
      nombreDoctor: watch("nombreDoctor"),
      fecha: watch("fecha"),
      turno: watch("turno"),
      idhorario: watch("idhorario"),
      hora_ini: watch("hora_ini"),
      hora_fin: watch("hora_fin"),
    });

    navigate(`${location.pathname}?confirmarTurno=true`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    reset();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-5 py-10 bg-bottom bg-cover lg:mx-4 bg-opacity-10 sm:min-h-screen bg-misturnos ">
      <div className="w-full max-w-4xl  my-5 border border-black rounded-lg shadow-xl bg-[#f1f1f1] border-opacity-20 ">
        <div className="px-5 py-5 text-center ">
          <h2 className="text-2xl font-bold underline uppercase text-green sm:text-3xl">
            Turnos Online
          </h2>
          <p className="mt-4 text-sm text-blue sm:mt-6 sm:text-base">
            Selecciona especialidad y profesional para buscar disponibilidad de
            turnos
          </p>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="sm:flex sm:flex-col sm:items-center sm:justify-center sm:w-full"
        >
          <FormTurno
            register={register}
            setValue={setValue}
            getValues={getValues}
            reset={reset}
            watch={watch}
          />

          <div className="flex items-center justify-center w-full px-2 py-4 ">
            <button
              type="button"
              className={`px-8 py-2  uppercase font-semibold rounded  transition duration-200 ${
                watch("turno") === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green hover:bg-greenHover cursor-pointer text-white"
              }`}
              onClick={handleSolicitar}
              disabled={watch("turno") === 0}
            >
              Solicitar
            </button>
          </div>
        </form>
      </div>
      {turnoData && (
        <ConfirmTurnoModal turnoData={turnoData} setValue={setValue} />
      )}
    </div>
  );
}
