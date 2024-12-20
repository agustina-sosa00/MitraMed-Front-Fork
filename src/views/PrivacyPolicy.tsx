export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 p-2 mb-10">
        <img
          src="/logos/mitra-med-logo-no-bg.webp"
          alt="logo"
          className="max-w-20 xl:max-w-32 max-h-20 xl:max-h-32"
        />
        <div className="hidden md:flex items-center">
          <img
            src="/logos/mitra-med-letras_no-bg1.webp"
            alt="logo-letras"
            className="max-w-44 max-h-44 xl:max-w-lg xl:max-h-lg xl:w-56 xl:h-14"
          />
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">Política de Privacidad</h1>
      <p className="mb-4">Última actualización: 20/12/2024</p>

      <h2 className="text-xl font-semibold mb-2">1. Datos que recopilamos</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Nombre</li>
        <li>Apellido</li>
        <li>Fecha de nacimiento</li>
        <li>Teléfono (si el usuario lo proporciona)</li>
        <li>Género</li>
        <li>Email</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">2. Uso de los datos</h2>
      <p className="mb-4">
        Los datos recopilados son utilizados exclusivamente para:
        <ul className="list-disc ml-6">
          <li>Procesos de autenticación.</li>
          <li>Registro en nuestra base de datos para habilitar funcionalidades del sistema.</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-2">3. Compartición de datos</h2>
      <p className="mb-4">
        Los datos personales no se comparten con terceros bajo ninguna circunstancia.
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Protección de datos</h2>
      <p className="mb-4">
        El acceso a los datos almacenados está protegido mediante:
        <ul className="list-disc ml-6">
          <li>Tokens de acceso.</li>
          <li>
            Procedimientos estrictos de seguridad para garantizar la confidencialidad de la
            información.
          </li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-2">5. Contacto</h2>
      <p className="mb-4">
        Si tienes dudas, consultas o deseas solicitar la eliminación de tus datos personales, puedes
        contactarnos a través de:
        <ul className="list-disc ml-6">
          <li>
            <strong>Email:</strong> mitramed.docta@gmail.com
          </li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-2">6. Leyes aplicables</h2>
      <p className="mb-4">
        Estamos ubicados en Argentina y cumplimos con las regulaciones locales relacionadas con la
        protección de datos personales.
      </p>
    </div>
  );
}
