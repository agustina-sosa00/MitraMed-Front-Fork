export default function Vista404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-gradient-to-br from-blue-50 to-white">
      <div className="flex flex-col items-center p-8 rounded-lg shadow-lg bg-white/80">
        <span className="text-[5rem] font-extrabold text-blue-400 drop-shadow-lg select-none">
          404
        </span>
        <h1 className="text-2xl font-bold text-primaryBlue mb-2">Página no encontrada</h1>
        <p className="text-lg text-gray-600 mb-2 text-center max-w-md">
          La ruta que intentaste abrir no existe, fue movida o no tienes permisos para acceder.
          <br />
          Si creés que esto es un error, contactá al administrador.
        </p>
        {/* <a
          href="/"
          className="mt-4 px-6 py-2 rounded bg-primaryGreen text-white font-semibold shadow hover:bg-greenHover transition-all duration-200 text-lg"
        >
          Ir al inicio
        </a> */}
      </div>
    </div>
  );
}
