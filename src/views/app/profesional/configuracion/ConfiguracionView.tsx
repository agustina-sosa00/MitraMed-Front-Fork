import { useEffect, useState } from "react";
import { ContainView } from "@/views/app/_components/features/ContainView";

export default function ConfiguracionView() {
  const [isProd, setIsProd] = useState(false); // ENTORNO false = Desarrollo, true = Producción
  const [isProdMode, setIsProdMode] = useState(false); // MODO false = Homologación, true = Producción

  useEffect(() => {
    if (isProd === true) {
      localStorage.setItem("_env", "prod");
    } else {
      localStorage.setItem("_env", "des");
    }

    if (isProdMode === true) {
      localStorage.setItem("_m", "prod");
    } else {
      localStorage.setItem("_m", "homo");
    }
  }, [isProd, isProdMode]);

  return (
    <ContainView title="configuración" padding="py-10">
      <div className="flex items-center justify-center w-full gap-8 px-4 py-10">
        {/* Card Entorno */}
        <div className="flex flex-col w-full max-w-sm gap-4 p-6 bg-white shadow-md rounded-xl">
          <span className="mb-2 text-lg font-semibold underline">Entorno</span>
          <div className="flex flex-col gap-3">
            <label
              className={`flex items-center gap-2 cursor-pointer ${
                !isProd ? "text-green-700" : "text-gray-500"
              }`}
            >
              <input
                type="radio"
                name="entorno"
                checked={!isProd}
                onChange={() => setIsProd(false)}
                className="w-5 h-5 accent-green-600"
              />
              <span className={`text-base px-2 py-1 rounded `}>Desarrollo</span>
            </label>
            <label
              className={`flex items-center gap-2 cursor-pointer ${
                isProd ? "text-green-700" : "text-blue"
              }`}
            >
              <input
                type="radio"
                name="entorno"
                checked={isProd}
                onChange={() => setIsProd(true)}
                className="w-5 h-5 accent-green-600"
              />
              <span className={`text-base px-2 py-1 rounded`}>Producción</span>
            </label>
          </div>
        </div>

        {/* Card Modo */}
        <div className="flex flex-col w-full max-w-sm gap-4 p-6 bg-white shadow-md rounded-xl">
          <span className="mb-2 text-lg font-semibold underline">Modo</span>
          <div className="flex flex-col gap-3">
            <label
              className={`flex items-center gap-2 cursor-pointer ${
                !isProdMode ? "text-green-700" : "text-gray-500"
              }`}
            >
              <input
                type="radio"
                name="modo"
                checked={!isProdMode}
                onChange={() => setIsProdMode(false)}
                className="w-5 h-5 accent-green-600"
              />
              <span className={`text-base px-2 py-1 rounded `}>Homologación</span>
            </label>
            <label className={`flex items-center gap-2 cursor-pointer `}>
              <input
                type="radio"
                name="modo"
                checked={isProdMode}
                onChange={() => setIsProdMode(true)}
                className="w-5 h-5 accent-green-600"
              />
              <span
                className={`text-base px-2 py-1 rounded ${isProdMode ? "bg-blue text-white" : ""}`}
              >
                Producción
              </span>
            </label>
          </div>
        </div>
      </div>
    </ContainView>
  );
}
