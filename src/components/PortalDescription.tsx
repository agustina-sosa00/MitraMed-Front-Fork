export default function PortalDescription() {
  return (
    <div className="col-span-3 mt-5 lg:mt-2 px-6">
      <h2 className="text-2xl font-semibold text-center lg:text-left text-gray-700 mb-5 underline">
        Mitra Med - Centro Médico
      </h2>
      <div className="lg:mt-10 space-y-4 lg:space-y-10">
        <p className="text-gray-700 text-lg text-justify lg:text-balance indent-4">
          Este portal está diseñado para facilitar la gestión de turnos en nuestro Centro Médico.
          Aquí, puedes reservar tus citas de manera rápida y sencilla.
        </p>
        <p className="text-gray-700 text-lg text-justify lg:text-balance indent-4">
          Para acceder a nuestras funcionalidades y poder{' '}
          <span className="underline underline-offset-2">gestionar tus turnos</span>, es necesario
          que inicies sesión en tu cuenta. Si aún no tienes una, te invitamos a registrarte para
          comenzar a utilizar nuestros servicios.
        </p>
        <p className="text-gray-700 text-lg text-justify lg:text-balance indent-4">
          Ofrecemos un servicio personalizado y eficiente para que puedas planificar tus visitas de
          acuerdo a tus necesidades y a las de tu familia.
        </p>
      </div>
      <p className="text-xl italic text-center mt-10 font-semibold text-blue-700">
        Gracias por elegirnos para tu atención médica!!!
      </p>
    </div>
  );
}
