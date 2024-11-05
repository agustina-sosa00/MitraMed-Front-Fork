import FormTurno from '../components/forms/FormTurno';

export default function Turnos() {
  return (
    <>
      <div className="p-6 pb-10 w-full max-w-6xl mx-auto mt-5 bg-gray-200 shadow-xl border border-black border-opacity-30">
        <div className="">
          <h2 className="text-3xl font-semibold text-center underline uppercase">Turnos online</h2>
          <p className="mt-8 mb-4 text-lg text-center">
            Selecciona especialidad y profesional para buscar disponibilidad de turnos
          </p>
        </div>
        <div className="">
          <form className="flex flex-col">
            <FormTurno />
            <div className="flex justify-center">
              <input
                type="submit"
                value="Solicitar"
                className="p-2 mt-8 max-w-xl w-full text-white text-lg bg-green-600 hover:bg-green-700 uppercase font-semibold cursor-pointer transition"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
