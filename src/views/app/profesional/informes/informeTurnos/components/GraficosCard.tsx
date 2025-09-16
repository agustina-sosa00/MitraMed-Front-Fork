import { useInformeTurnosStore } from "../store/informeTurnosStore";
import { useMemo } from "react";
import DonutChart from "@/views/app/components/ui/donut/DonutChart";

export default function GraficosCard() {
  const { informeTurnosData, hasSearched } = useInformeTurnosStore();

  const colorPalette = [
    "#D50032",
    "#04AAC0",
    "#1226AA",
    "#f37d2e",
    "#1A9AE9",
    "#00BF89",
    "#ECDC2C",
    "#518915",
    "#A259F7",
    "#FFB800",
  ];

  const obrasSociales = useMemo(() => {
    const data = Array.isArray(informeTurnosData?.data) ? informeTurnosData.data : [];
    const counts: Record<string, number> = {};
    data.forEach((item) => {
      const name =
        item.nosocial && String(item.nosocial).trim() !== "" ? String(item.nosocial).trim() : null;
      if (name) {
        counts[name] = (counts[name] || 0) + 1;
      }
    });
    // Assign a color to each obra social
    return Object.entries(counts).map(([name, value], idx) => ({
      name,
      value,
      colors: colorPalette[idx % colorPalette.length],
    }));
  }, [informeTurnosData]);

  const especialidades = useMemo(() => {
    const data = Array.isArray(informeTurnosData?.data) ? informeTurnosData.data : [];
    const counts: Record<string, number> = {};
    data.forEach((item) => {
      const name =
        item.nespecialidad && String(item.nespecialidad).trim() !== ""
          ? String(item.nespecialidad).trim()
          : null;
      if (name) {
        counts[name] = (counts[name] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, value], idx) => ({
      name,
      value,
      colors: colorPalette[idx % colorPalette.length],
    }));
  }, [informeTurnosData]);

  const cardsConfig = [
    {
      title: "Obras Sociales",
      data: obrasSociales,
    },
    {
      title: "Especialidades",
      data: especialidades,
    },
  ];

  return (
    <div className="grid w-full grid-cols-2 h-full gap-4 mt-2 mb-6 justify-items-center border p-2 rounded bg-slate-100">
      {cardsConfig.map((card) => (
        <div
          key={card.title}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col items-center w-full max-w-[540px] min-w-[340px]"
        >
          <h1
            className={`h-6 text-2xl font-semibold mb-2 tracking-wider underline underline-offset-4 ${hasSearched ? "text-blue" : "text-gray-400"}`}
          >
            {card.title}
          </h1>
          <div className="flex flex-col w-full items-center justify-center gap-2">
            <div className="w-full h-[250px] flex items-center justify-center">
              <DonutChart data={card.data} />
              {hasSearched && (
                <div className="flex w-52 justify-start mt-2 pr-2 ">
                  <span className="text-lg text-slate-600 font-semibold">
                    {card.data?.reduce((acc, item) => acc + Number(item.value), 0)} Registros
                  </span>
                </div>
              )}
            </div>
            <div className="w-full pt-2">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-1 w-full">
                {card.data?.map((item) => (
                  <div key={item.name} className="flex items-center gap-1 min-w-0">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: item.colors }}
                    ></div>
                    <span
                      className="text-[11px] font-medium text-blue truncate max-w-[110px] cursor-default"
                      title={item.name}
                    >
                      {item.name}
                    </span>
                    <span className="text-[10px] text-gray-500 ml-1 cursor-default">
                      ({item.value})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
