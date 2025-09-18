export default function TerminosYCondicionesView() {
  return (
    <div className="max-w-4xl p-8 mx-auto text-gray-800">
      <div className="flex flex-col items-center justify-center gap-3 p-2 mb-10 md:flex-row">
        <img
          src="/logos/mitra-med-logo-no-bg.webp"
          alt="logo"
          className="max-w-20 xl:max-w-32 max-h-20 xl:max-h-32"
        />
        <div className="items-center hidden md:flex">
          <img
            src="/logos/mitra-med-letras_no-bg1.webp"
            alt="logo-letras"
            className="max-w-44 max-h-44 xl:max-w-lg xl:max-h-lg xl:w-56 xl:h-14"
          />
        </div>
      </div>

      <h1 className="mb-4 text-3xl font-bold">Términos y Condiciones</h1>
      <p className="mb-4">
        Estos Términos y Condiciones rigen el uso de la aplicación <b>MitraMed</b>, desarrollada y
        gestionada por <b>NovaGestión</b>. Al utilizar esta aplicación, aceptas cumplir con los
        siguientes términos.
      </p>
      <h2 className="mt-6 mb-2 text-2xl font-semibold">1. Uso de la Aplicación</h2>
      <p className="mb-4">
        Esta aplicación está destinada únicamente para la gestión de turnos médicos. Los usuarios
        pueden registrarse y autenticarse mediante su correo electrónico o cuenta de Google para
        acceder a las funciones ofrecidas.
      </p>

      <h2 className="mt-6 mb-2 text-2xl font-semibold">2. Recopilación de Datos</h2>
      <p className="mb-4">
        Para el correcto funcionamiento de la aplicación, recopilamos la siguiente información
        personal:
      </p>
      <ul className="mb-4 list-disc list-inside">
        <li>Nombre y apellido</li>
        <li>Fecha de nacimiento</li>
        <li>Email</li>
        <li>Género</li>
        <li>Contraseña o cuenta de Google</li>
      </ul>
      <p className="mb-4">
        Además, si reservas un turno, recopilaremos y sincronizaremos esa información con el centro
        médico correspondiente.
      </p>

      <h2 className="mt-6 mb-2 text-2xl font-semibold">3. Protección de los Datos</h2>
      <p className="mb-4">
        Todos los datos recopilados están protegidos mediante medidas estrictas de seguridad,
        incluyendo el uso de tokens. No compartimos tus datos con terceros sin tu consentimiento
        explícito.
      </p>

      <h2 className="mt-6 mb-2 text-2xl font-semibold">4. Responsabilidad</h2>
      <p className="mb-4">
        <b>NovaGestión</b> no se hace responsable de fallos técnicos, interrupciones en el servicio,
        o errores en la gestión de turnos que puedan surgir por el uso de la aplicación.
      </p>

      <h2 className="mt-6 mb-2 text-2xl font-semibold">5. Contacto</h2>
      <p className="mb-4">
        Si tienes preguntas o inquietudes sobre estos términos, puedes contactarnos en:
      </p>
      <ul className="mb-4 list-disc list-inside">
        <li>Email: mitramed.docta@gmail.com</li>
      </ul>

      <h2 className="mt-6 mb-2 text-2xl font-semibold">6. Cambios en los Términos</h2>
      <p className="mb-4">
        Nos reservamos el derecho de actualizar estos términos en cualquier momento. Notificaremos a
        los usuarios sobre cambios significativos mediante un aviso en la aplicación.
      </p>

      <p className="mt-6">Última actualización: 20/12/2024</p>
    </div>
  );
}
