import React from "react";

export const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between w-full py-1 lg:items-baseline mx:flex-row mb-11">
      <div className="flex flex-col items-start space-y-6 lg:w-4/6 xl:max-w-6xl">
        <h2 className="mx-auto mb-6 font-serif text-2xl font-semibold text-center text-gray-800 underline lg:text-4xl lg:font-normal lg:decoration-4 underline-offset-4">
          MitraMed - Centro Médico
        </h2>

        <div className="ml-5 mr-8 space-y-6 indent-8 sm:mx-10 sm:indent-0 mx:indent-8">
          <p className="text-lg leading-relaxed text-justify text-gray-800 lg:text-xl xl:text-2xl">
            Bienvenido al portal de{" "}
            <span className="font-medium text-blue-600">reserva de turnos</span>{" "}
            para nuestro Centro Médico, donde podrás agendar tus consultas de
            forma rápida y sencilla.
          </p>

          <p className="text-lg leading-relaxed text-justify text-gray-800 lg:text-xl xl:text-2xl">
            Para disfrutar de todas las funciones,{" "}
            <span className="font-medium underline decoration-amber-500 decoration-2 underline-offset-2">
              inicia sesión en tu cuenta
            </span>
            . Si aún no tienes una,{" "}
            <span className="font-semibold text-blue-600">regístrate</span> para
            comenzar a usar nuestras herramientas.
          </p>

          <p className="text-lg leading-relaxed text-justify text-gray-800 lg:text-xl xl:text-2xl">
            Disfruta de un servicio personalizado que te permitirá organizar las
            consultas según tus necesidades y las de tu familia.
          </p>
        </div>

        <p className="mx-auto mt-16 text-xl italic font-semibold tracking-wide text-center text-blue-600 lg:text-2xl xl:text-3xl">
          ¡Gracias por elegirnos!
        </p>
      </div>

      <div className="w-full max-w-sm xl:max-w-2xl md:mr-4">
        <div className="p-5 mt-10 mb-10 border-2 border-black rounded shadow-xl mx:mt-0 border-opacity-30">
          {/* <SignInForm /> */}
        </div>
      </div>
    </div>
  );
};
