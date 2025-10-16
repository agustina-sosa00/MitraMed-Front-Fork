import { useEffect, useState } from "react";
import TitleView from "../../_components/features/TitleView";
import { ActionButton } from "@/frontend-resourses/components";

export default function ConfiguracionView() {
  const [isProd, setIsProd] = useState<boolean | null>(null); // null = no inicializado
  const [isProdMode, setIsProdMode] = useState<boolean | null>(null);
  const [pendingProd, setPendingProd] = useState<boolean | null>(null);
  const [pendingProdMode, setPendingProdMode] = useState<boolean | null>(null);

  // Inicializar solo una vez al montar
  useEffect(() => {
    let initialEnv: boolean;
    let initialMode: boolean;
    // Si existe VITE_ENV y es development => des, si no => prod
    if (import.meta.env.VITE_ENV === "development") {
      initialEnv = false;
    } else {
      initialEnv = true;
    }
    // Leer localStorage si existe, si no setear según VITE_ENV
    const envLS = localStorage.getItem("_env");
    if (envLS === "des") initialEnv = false;
    if (envLS === "prod") initialEnv = true;
    setIsProd(initialEnv);
    setPendingProd(initialEnv);

    const modeLS = localStorage.getItem("_m");
    if (modeLS === "prod") initialMode = true;
    else initialMode = false;
    setIsProdMode(initialMode);
    setPendingProdMode(initialMode);
  }, []);

  // Guardar cambios
  const handleSave = () => {
    if (pendingProd === true) {
      localStorage.setItem("_env", "prod");
    } else {
      localStorage.setItem("_env", "des");
    }
    if (pendingProdMode === true) {
      localStorage.setItem("_m", "prod");
    } else {
      localStorage.setItem("_m", "homo");
    }
    setIsProd(pendingProd);
    setIsProdMode(pendingProdMode);
  };
  //region return
  return (
    <>
      <TitleView title="configuración" />
      <div className="flex items-center justify-center w-full gap-8 px-4 py-10">
        {/* Card Entorno */}
        <div className="flex flex-col w-full max-w-sm gap-4 p-6 bg-white shadow-md rounded-xl">
          <span className="mb-2 text-lg font-semibold underline">Entorno</span>
          <div className="flex flex-col gap-3">
            <label
              className={`flex items-center gap-2 cursor-pointer ${
                pendingProd === false ? "text-green-700" : "text-gray-500"
              }`}
            >
              <input
                type="radio"
                name="entorno"
                checked={pendingProd === false}
                onChange={() => setPendingProd(false)}
                className="w-5 h-5 accent-green-600"
              />
              <span className={`text-base px-2 py-1 rounded `}>Desarrollo</span>
            </label>
            <label
              className={`flex items-center gap-2 cursor-pointer ${
                pendingProd === true ? "text-green-700" : "text-primaryBlue"
              }`}
            >
              <input
                type="radio"
                name="entorno"
                checked={pendingProd === true}
                onChange={() => setPendingProd(true)}
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
                pendingProdMode === false ? "text-green-700" : "text-gray-500"
              }`}
            >
              <input
                type="radio"
                name="modo"
                checked={pendingProdMode === false}
                onChange={() => setPendingProdMode(false)}
                className="w-5 h-5 accent-green-600"
              />
              <span className={`text-base px-2 py-1 rounded `}>Homologación</span>
            </label>
            <label className={`flex items-center gap-2 cursor-pointer `}>
              <input
                type="radio"
                name="modo"
                checked={pendingProdMode === true}
                onChange={() => setPendingProdMode(true)}
                className="w-5 h-5 accent-green-600"
              />
              <span
                className={`text-base px-2 py-1 rounded ${pendingProdMode === true ? "bg-primaryBlue text-white" : ""}`}
              >
                Producción
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <ActionButton
          onClick={handleSave}
          disabled={pendingProd === isProd && pendingProdMode === isProdMode}
          color="customGray"
          customColorText="primaryBlue"
          text="Guardar cambios"
          addClassName="!rounded transition"
        />
      </div>
    </>
  );
}
