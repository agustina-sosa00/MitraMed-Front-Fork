import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

    console.log(watch("idhorario"));
    navigate(`${location.pathname}?confirmarTurno=true`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    reset();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-full py-10 mx-4 sm:min-h-screen">
      <div className="w-full max-w-4xl mb-5 top-5 left-3">
        <Link
          to="/inicio"
          className="px-4 py-2 text-xs font-semibold text-white transition duration-200 rounded-lg bg-green sm:text-base hover:bg-greenHover"
        >
          Volver al inicio
        </Link>
      </div>
      <div className="w-full max-w-4xl  border border-black rounded-lg shadow-xl bg-[#f1f1f1] border-opacity-20 relative">
        <div className="py-5 text-center ">
          <h2 className="text-2xl font-bold underline uppercase text-green sm:text-3xl">
            Turnos Online
          </h2>
          <p className="mt-4 text-sm text-blue sm:mt-6 sm:text-lg">
            Selecciona especialidad y profesional para buscar disponibilidad de
            turnos
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

          <div className="flex justify-center w-full px-2 py-5">
            <button
              type="button"
              className={`p-3 mt-8 max-w-md w-full text-lg uppercase font-semibold rounded-lg  transition duration-200 ${
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
