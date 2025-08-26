import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import TextAlert from "@/components/ui/TextAlert";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Settings() {
  const [isProd, setIsProd] = useState(false); // false = Desarrollo, true = Producción
  const [isProdMode, setIsProdMode] = useState(false); // false = Homologación, true = Producción

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
    <div className="relative flex flex-col w-full h-screen gap-5 px-20 py-10">
      <div className="absolute right-5 top-5">
        <TextAlert />
      </div>
      <div>
        <Button
          label="volver"
          handle={() => window.history.back()}
          icon={<IoMdArrowRoundBack className="text-2xl" />}
        />
      </div>

      {/* título */}
      <div className="flex justify-center w-full h-20 ">
        <h1 className="text-2xl font-medium uppercase lg:text-4xl text-green ">
          configuración
        </h1>
      </div>

      {/* switches */}
      <div className="flex flex-col items-center justify-between w-full gap-4 ">
        {/* Switch 1 */}
        <div className="flex items-center gap-2">
          <p className="text-lg ">Entorno:</p>
          <div className="flex items-center gap-3">
            <p
              className={`text-xl ${
                isProd
                  ? "text-blue"
                  : "bg-green text-white py-1 px-2 rounded transition-all duration-300"
              }`}
            >
              Desarrollo
            </p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isProd}
                onChange={(e) => setIsProd(e.target.checked)}
              />
              <div className="w-16 h-8 duration-300 bg-white rounded-full peer ring-2 ring-green after:duration-300 after:bg-green peer-checked:after:bg-blue peer-checked:ring-blue after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95"></div>
            </label>
            <p
              className={`text-xl ${
                isProd
                  ? "bg-blue text-white py-1 px-2 rounded transition-all duration-300"
                  : "text-blue"
              }`}
            >
              Producción
            </p>
          </div>
        </div>

        {/* Switch 2 */}
        <div className="flex items-center gap-2">
          <p className="text-lg ">Modo:</p>
          <div className="flex items-center gap-3">
            <p
              className={`text-xl ${
                isProdMode
                  ? "text-blue"
                  : "bg-green text-white py-1 px-2 rounded transition-all duration-300"
              }`}
            >
              Homologación
            </p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isProdMode}
                onChange={(e) => setIsProdMode(e.target.checked)}
              />
              <div className="w-16 h-8 duration-300 bg-white rounded-full peer ring-2 ring-green after:duration-300 after:bg-green peer-checked:after:bg-blue peer-checked:ring-blue after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95"></div>
            </label>
            <p
              className={`text-xl ${
                isProdMode
                  ? "bg-blue text-white py-1 px-2 rounded transition-all duration-300"
                  : "text-blue"
              }`}
            >
              Producción
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-center">
        <p className="text-lg text-blue">
          Entorno actual:{" "}
          <span className="text-xl font-medium">
            {isProd ? "Producción" : "Desarrollo"}
          </span>
        </p>
        <p className="text-lg text-blue">
          Modo actual:{" "}
          <span className="text-xl font-medium">
            {isProdMode ? "Producción" : "Homologación"}
          </span>
        </p>
      </div>
    </div>
  );
}
