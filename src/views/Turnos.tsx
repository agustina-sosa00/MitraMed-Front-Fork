import FormTurno from '../components/forms/FormTurno';

export default function Turnos() {
  return (
    <>
      <div className="p-6 w-full max-w-3xl mx-auto mt-5 bg-gray-300 shadow-xl">
        <div className="">
          <h2 className="text-3xl text-center underline uppercase">Turnos online</h2>
          <p className="my-4 text-xl text-center">
            Selecciona especialidad y profesional para buscar disponibilidad de turnos
          </p>
        </div>
        <div className="">
          <form className="flex flex-col">
            <FormTurno />
            <div className="flex justify-center">
              <input
                type="submit"
                value="Buscar"
                className="p-3 mt-8 max-w-xl w-full text-white bg-green-600 hover:bg-green-700 uppercase font-semibold cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
