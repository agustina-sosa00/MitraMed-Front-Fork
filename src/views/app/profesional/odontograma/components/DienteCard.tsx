import { useMemo } from "react";
import { box, sinProvisoriosDeTratamientosConCara } from "../utils/odontogram.lookups";
import Diente from "./Diente";
import { useOdontogramaStore } from "../store/OdontogramaStore";

export default function DienteCard({ editOdontogram, setOpenMenu }) {
  const originalData = useOdontogramaStore((state) => state.originalData);
  const teethIdsState = useOdontogramaStore((state) => state.teethIdsState);
  const contextMenu = useOdontogramaStore((state) => state.contextMenu);

  const dientesCambios = useMemo(() => {
    const A = sinProvisoriosDeTratamientosConCara(originalData);
    const B = sinProvisoriosDeTratamientosConCara(teethIdsState);

    const cambiados = new Set<number>();
    const todos = new Set<number>([...Object.keys(A).map(Number), ...Object.keys(B).map(Number)]);

    for (const num of todos) {
      const antes = A[num] || [];
      const ahora = B[num] || [];
      if (JSON.stringify(antes) !== JSON.stringify(ahora)) {
        cambiados.add(num);
      }
    }
    return cambiados;
  }, [originalData, teethIdsState]);

  return (
    <>
      {
        // region render tooth
      }
      <div className="flex flex-wrap w-full ">
        {box.slice(0, 4).map((box) => (
          <div
            key={box.name}
            className={`w-1/2 h-1/2 p-1 gap-1  ${
              box.name.includes("arriba") ? "border-b" : "border-t"
            } ${
              box.ladoVisual === "izquierda"
                ? "border-r flex  justify-end"
                : "border-l flex items-end"
            } justify-start ${editOdontogram ? "border-gray-400" : "border-gray-300"}`}
          >
            {box.numbers.map((toothNumber) => (
              <div
                key={toothNumber}
                className={`flex  items-center ${
                  box.name.includes("abajo") ? "flex-col-reverse" : "flex-col"
                }`}
              >
                <p
                  className={`text-sm  ${editOdontogram ? "text-[#6e6d6d]" : "text-[#b6b5b5]"} ${
                    dientesCambios.has(toothNumber) && "text-[#ff9e00] font-bold"
                  } `}
                >
                  {toothNumber}
                </p>
                <Diente
                  toothNumber={toothNumber}
                  isActive={editOdontogram && contextMenu === toothNumber}
                  handle={() => setOpenMenu(true)}
                  dataIds={teethIdsState[toothNumber] || []}
                  styleDisabled={editOdontogram}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {
        // region render tooth niños
      }
      <div className="flex flex-wrap w-full h-1/2">
        {box.slice(4).map((box) => (
          <div
            key={box.name}
            className={`w-1/2 h-1/2 p-2 gap-1  ${
              box.name.includes("arriba") ? "border-b" : "border-t"
            } ${
              box.ladoVisual === "izquierda"
                ? "border-r flex  justify-end"
                : "border-l flex items-start"
            } justify-start ${editOdontogram ? "border-gray-400" : "border-gray-300"} `}
          >
            {box.numbers.map((toothNumber) => (
              <div
                key={toothNumber}
                className={`flex  items-center ${
                  box.name.includes("abajo") ? "flex-col-reverse" : "flex-col"
                }`}
              >
                <p
                  className={`text-sm  ${editOdontogram ? "text-[#6e6d6d]" : "text-[#b6b5b5]"} ${
                    dientesCambios.has(toothNumber) && "text-[#ff9e00] font-bold"
                  } `}
                >
                  {toothNumber}
                </p>
                <Diente
                  toothNumber={toothNumber}
                  isActive={editOdontogram && contextMenu === toothNumber}
                  handle={() => setOpenMenu(true)}
                  dataIds={teethIdsState[toothNumber] || []}
                  styleDisabled={editOdontogram}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
