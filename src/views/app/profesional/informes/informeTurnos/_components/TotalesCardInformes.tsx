import { useMemo } from "react";
import { useInformeTurnosStore } from "../store/informeTurnosStore";
import { PriceInput } from "@/frontend-resourses/components";

export default function TotalesCardInformes() {
  const hasSearched = useInformeTurnosStore((state) => state.hasSearched);
  const filteredRows = useInformeTurnosStore((state) => state.filteredRows);

  const { totalImporte, countObraSocial, countParticulares, countTotal } = useMemo(() => {
    if (!hasSearched) {
      return {
        totalObraSocial: 0,
        totalParticulares: 0,
        totalImporte: 0,
        countObraSocial: 0,
        countParticulares: 0,
        countTotal: 0,
      };
    }
    const data = Array.isArray(filteredRows) ? filteredRows : [];
    let totalObraSocial = 0;
    let totalParticulares = 0;
    let countObraSocial = 0;
    let countParticulares = 0;
    data.forEach((item) => {
      if (item.nosocial && String(item.nosocial).trim() !== "") {
        totalObraSocial += Number(item.importe) || 0;
        countObraSocial++;
      } else {
        totalParticulares += Number(item.importe) || 0;
        countParticulares++;
      }
    });
    return {
      totalObraSocial,
      totalParticulares,
      totalImporte: totalObraSocial + totalParticulares,
      countObraSocial,
      countParticulares,
      countTotal: countObraSocial + countParticulares,
    };
  }, [filteredRows, hasSearched]);

  const totalesData = [
    {
      label: "Obra Social:",
      value: countObraSocial,
      border: false,
      isImporte: false,
    },
    {
      label: "Particulares:",
      value: countParticulares,
      border: false,
      isImporte: false,
    },
    {
      label: "Total Consultas:",
      value: countTotal,
      border: true,
      isImporte: false,
    },
    {
      label: "Total Importe:",
      value: totalImporte,
      border: true,
      isImporte: true,
    },
  ];
  return (
    <div className="flex items-end justify-center flex-1 ">
      <div className="flex gap-2 px-4 py-2 bg-white border border-gray-200 rounded">
        {/* Columna de totales de consultas */}
        <div className="flex flex-col gap-3 pr-6 ">
          {totalesData
            .filter((item) => !item.isImporte)
            .map((item, _idx) => (
              <div
                key={item.label}
                className={`flex justify-between items-center ${item.border ? " border-t border-gray-300 pt-3 mt-2" : ""}`}
              >
                <span
                  className={
                    `min-w-36 font-semibold tracking-wider text-lg ` +
                    (hasSearched ? "text-slate-700 " : "text-gray-400 opacity-80 cursor-default")
                  }
                >
                  {item.label}
                </span>
                <span
                  className={
                    `w-16 text-xl font-bold text-right select-text ` +
                    (hasSearched ? "text-sky-600" : "text-gray-400 opacity-80")
                  }
                >
                  {item.value}
                </span>
              </div>
            ))}
        </div>

        {/* Columna de importe */}
        <div className="flex flex-col ">
          {totalesData
            .filter((item) => item.isImporte)
            .map((item, _idx) => (
              <div
                key={item.label}
                className={`flex flex-col h-full justify-between items-center gap-y-4 border-l border-gray-200`}
              >
                <span
                  className={
                    ` font-bold tracking-wider text-lg  ` +
                    (hasSearched ? "text-slate-700 " : "text-gray-400 opacity-80 cursor-default")
                  }
                >
                  {item.label}
                </span>
                <PriceInput
                  value={hasSearched ? item.value : 0}
                  disabled
                  addInputClassName={
                    `max-w-52 text-xl !font-bold !border-0 !p-0 !h-6 !bg-transparent ` +
                    (hasSearched ? "text-red-600" : "text-gray-500 opacity-60 cursor-default")
                  }
                  withPrefix={true}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
