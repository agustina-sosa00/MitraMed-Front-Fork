import { NewAccount } from "@/types/index";
import { useState, useEffect } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  field: ControllerRenderProps<NewAccount, "fnac">;
};

export const SelectBirthdayDiv = ({ field }: Props) => {
  const [dia, setDia] = useState<number | null>(null);
  const [mes, setMes] = useState<number | null>(null);
  const [anio, setAnio] = useState<number | null>(null);
  const [openDia, setOpenDia] = useState(false);
  const [openMes, setOpenMes] = useState(false);
  const [openAnio, setOpenAnio] = useState(false);

  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const anioMaximo = new Date().getFullYear() - 18;
  const anios = Array.from({ length: 70 }, (_, i) => anioMaximo - i);

  useEffect(() => {
    if (field.value) {
      const [a, m, d] = field.value.split("-");
      setDia(Number(d));
      setMes(Number(m));
      setAnio(Number(a));
    }
  }, [field.value]);

  useEffect(() => {
    if (dia && mes && anio) {
      const fecha = `${anio}-${String(mes).padStart(2, "0")}-${String(
        dia
      ).padStart(2, "0")}`;
      field.onChange(fecha);
    }
  }, [dia, mes, anio]);

  const handleCloseSelect = () => {
    openDia && setOpenDia(false);
    openMes && setOpenMes(false);
    openAnio && setOpenAnio(false);
  };

  return (
    <div
      className="flex justify-between gap-2 lg:gap-4 "
      onClick={handleCloseSelect}
    >
      {/* Día */}
      <div className="relative w-28">
        <div
          className="flex items-center justify-between px-2 py-1 bg-white border border-gray-300 cursor-pointer text-blue"
          onClick={() => {
            setOpenDia(!openDia);
            setOpenMes(false);
            setOpenAnio(false);
          }}
        >
          {dia ? dia : <p className="text-sm font-medium text-gray-300">Día</p>}
          {
            <IoIosArrowDown
              className={`${
                openDia
                  ? " rotate-180 transition-all duration-300 text-blue "
                  : "rotate-0 transition-all duration-300 text-blue"
              }`}
            />
          }
        </div>
        {openDia && (
          <div className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 shadow max-h-40">
            {dias.map((d) => (
              <div
                key={d}
                className="p-2 cursor-pointer hover:bg-greenHover text-blue hover:text-white"
                onClick={() => {
                  setDia(d);
                  setOpenDia(false);
                }}
              >
                {d}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mes */}
      <div className="relative w-32">
        <div
          className="flex items-center justify-between px-2 py-1 bg-white border border-gray-300 cursor-pointer text-blue"
          onClick={() => {
            setOpenMes(!openMes);
            setOpenDia(false);
            setOpenAnio(false);
          }}
        >
          {mes ? (
            meses[mes - 1]
          ) : (
            <p className="text-sm font-medium text-gray-300">Mes</p>
          )}
          {
            <IoIosArrowDown
              className={`${
                openMes
                  ? " rotate-180 transition-all duration-300 text-blue "
                  : "rotate-0 transition-all duration-300 text-blue"
              }`}
            />
          }
        </div>
        {openMes && (
          <div className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 shadow max-h-40">
            {meses.map((m, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-greenHover text-blue hover:text-white"
                onClick={() => {
                  setMes(index + 1);
                  setOpenMes(false);
                }}
              >
                {m}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Año */}
      <div className="relative w-32">
        <div
          className="flex items-center justify-between px-2 py-1 bg-white border border-gray-300 cursor-pointer text-blue"
          onClick={() => {
            setOpenAnio(!openAnio);
            setOpenDia(false);
            setOpenMes(false);
          }}
        >
          {anio ? (
            anio
          ) : (
            <p className="text-sm font-medium text-gray-300">Año</p>
          )}
          {
            <IoIosArrowDown
              className={`${
                openAnio
                  ? " rotate-180 transition-all duration-300 text-blue "
                  : "rotate-0 transition-all duration-300 text-blue"
              }`}
            />
          }
        </div>
        {openAnio && (
          <div className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 shadow max-h-40">
            {anios.map((a) => (
              <div
                key={a}
                className="p-2 cursor-pointer hover:bg-greenHover text-blue hover:text-white"
                onClick={() => {
                  setAnio(a);
                  setOpenAnio(false);
                }}
              >
                {a}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
