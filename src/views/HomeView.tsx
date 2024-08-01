export default function HomeView() {
  return (
    <>
      <div className="grid grid-cols-6 ">
        <div className="col-span-3 mx-16 max-w-3xl">
          <form className="my-4 p-8 bg-neutral-300 shadow-2xl">
            <div className="">
              <h2 className="text-3xl text-gray-800 font-medium underline">Turnos Online</h2>
              <p className="text-lg my-6 text-gray-800">
                Completa el siguiente formulario para gestionar un turno
              </p>
            </div>

            <input
              type="submit"
              value="Solicitar turno"
              className="mt-10 p-3 w-full text-gray-200 uppercase font-bold bg-green-900 hover:bg-green-800 shadow-lg cursor-pointer transition-colors"
            />
          </form>
        </div>

        <div className="col-span-3 my-4 mx-4 p-8">
          <h2 className="text-3xl text-gray-800 text-center font-medium underline">Mis turnos</h2>
        </div>
      </div>
    </>
  );
}
