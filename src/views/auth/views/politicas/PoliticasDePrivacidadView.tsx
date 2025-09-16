export default function PoliticasDePrivacidadView() {
  return (
    <div className="max-w-4xl p-6 mx-auto">
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

      <h1 className="mb-4 text-2xl font-bold">Política de Privacidad</h1>
      <p className="mb-4">Última actualización: 20/12/2024</p>

      <h2 className="mb-2 text-xl font-semibold">1. Datos que recopilamos</h2>
      <ul className="mb-4 ml-6 list-disc">
        <li>Nombre</li>
        <li>Apellido</li>
        <li>Fecha de nacimiento</li>
        <li>Teléfono (si el usuario lo proporciona)</li>
        <li>Género</li>
        <li>Email</li>
      </ul>

      <h2 className="mb-2 text-xl font-semibold">2. Uso de los datos</h2>
      <p className="mb-4">
        Los datos recopilados son utilizados exclusivamente para:
        <ul className="ml-6 list-disc">
          <li>Procesos de autenticación.</li>
          <li>Registro en nuestra base de datos para habilitar funcionalidades del sistema.</li>
        </ul>
      </p>

      <h2 className="mb-2 text-xl font-semibold">3. Compartición de datos</h2>
      <p className="mb-4">
        Los datos personales no se comparten con terceros bajo ninguna circunstancia.
      </p>

      <h2 className="mb-2 text-xl font-semibold">4. Protección de datos</h2>
      <p className="mb-4">
        El acceso a los datos almacenados está protegido mediante:
        <ul className="ml-6 list-disc">
          <li>Tokens de acceso.</li>
          <li>
            Procedimientos estrictos de seguridad para garantizar la confidencialidad de la
            información.
          </li>
        </ul>
      </p>

      <h2 className="mb-2 text-xl font-semibold">5. Contacto</h2>
      <p className="mb-4">
        Si tienes dudas, consultas o deseas solicitar la eliminación de tus datos personales, puedes
        contactarnos a través de:
        <ul className="ml-6 list-disc">
          <li>
            <strong>Email:</strong> mitramed.docta@gmail.com
          </li>
        </ul>
      </p>

      <h2 className="mb-2 text-xl font-semibold">6. Leyes aplicables</h2>
      <p className="mb-4">
        Estamos ubicados en Argentina y cumplimos con las regulaciones locales relacionadas con la
        protección de datos personales.
      </p>
    </div>
  );
}
