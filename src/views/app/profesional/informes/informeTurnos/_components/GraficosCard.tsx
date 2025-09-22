import { useInformeTurnosStore } from "../store/informeTurnosStore";
import { useMemo } from "react";
import DonutChart from "@/views/app/_components/ui/donut/DonutChart";

export default function GraficosCard() {
  const { hasSearched, filteredRows } = useInformeTurnosStore();

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
    if (!hasSearched) return [];
    const data = Array.isArray(filteredRows) ? filteredRows : [];
    const counts: Record<string, number> = {};
    data.forEach((item) => {
      let name: string | null = null;
      if (item.idosocial === 0 || !item.nosocial || String(item.nosocial).trim() === "") {
        name = "PARTICULAR";
      } else {
        name = item.nosocial.trim();
      }
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
  }, [filteredRows, hasSearched]);

  const especialidades = useMemo(() => {
    if (!hasSearched) return [];
    const data = Array.isArray(filteredRows) ? filteredRows : [];
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
  }, [filteredRows, hasSearched]);

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
    <div className="grid w-full h-full grid-cols-2 gap-4 p-2 mt-2 mb-6 border rounded justify-items-center bg-slate-100">
      {cardsConfig.map((card) => {
        const isEmpty = !hasSearched || !card.data || card.data.length === 0;
        const emptyData = [
          { name: "Sin datos", value: 1, colors: "#e5e7eb" }, // gris claro
        ];
        return (
          <div
            key={card.title}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col items-center w-full max-w-[540px] min-w-[340px]"
          >
            <h1
              className={`h-6 text-2xl font-semibold mb-2 tracking-wider underline underline-offset-4 ${hasSearched ? "text-primaryBlue" : "text-gray-400"}`}
            >
              {card.title}
            </h1>
            <div className="flex flex-col items-center justify-center w-full gap-2">
              <div
                className={`w-full h-[250px] flex items-center justify-center ${isEmpty ? "pointer-events-none select-none donut-empty" : ""}`}
                tabIndex={isEmpty ? -1 : undefined}
              >
                <DonutChart data={isEmpty ? emptyData : card.data} />
                {hasSearched && !isEmpty && (
                  <div className="flex justify-start pr-2 mt-2 w-52 ">
                    <span className="text-lg font-semibold text-slate-600">
                      {card.data?.reduce((acc, item) => acc + Number(item.value), 0)} Registros
                    </span>
                  </div>
                )}
                {/* Ocultar labels del donut si está vacío */}
                <style>{`.donut-empty svg text, .donut-empty .recharts-layer text, .donut-empty .recharts-label { display: none !important; }`}</style>
              </div>
              <div className="w-full pt-2">
                <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-1">
                  {isEmpty ? (
                    <div className="flex items-center min-w-0 gap-1 pointer-events-none select-none opacity-60">
                      <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
                      <span className="text-[11px] font-medium text-gray-400 truncate max-w-[110px] cursor-default select-none">
                        Sin datos
                      </span>
                    </div>
                  ) : (
                    card.data?.map((item) => (
                      <div key={item.name} className="flex items-center min-w-0 gap-1">
                        <div
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: item.colors }}
                        ></div>
                        <span
                          className="text-[11px] font-medium text-primaryBlue truncate max-w-[110px] cursor-default"
                          title={item.name}
                        >
                          {item.name}
                        </span>
                        <span className="text-[10px] text-gray-500 ml-1 cursor-default">
                          ({item.value})
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
