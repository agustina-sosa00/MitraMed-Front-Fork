import { useState } from "react";
import { Tooth } from "./Tooth";

export const Odontogram = () => {
  const [contextMenu, setContextMenu] = useState<number | null>(null);
  const [selectedTreatments, setSelectedTreatments] = useState<{
    [toothNumber: number]: {
      action: "realizado" | "a realizar";
      tratamiento: string;
      cara?: string;
    };
  }>({});
  const handleShowMenu = () => {
    setContextMenu(null);
  };
  const paciente = "Agustina Sosa";
  const dni = "11234567";
  return (
    <div
      className="flex flex-col w-full h-screen gap-5 px-5 py-20 "
      onClick={handleShowMenu}
    >
      <div className="flex flex-col w-full px-16">
        <h1 className="text-2xl font-medium uppercase lg:text-4xl text-green">
          odontograma
        </h1>
        <h3 className="text-sm text-blue">
          Paciente: <span className="text-base font-medium">{paciente}</span>
        </h3>
        <h3 className="text-sm text-blue">
          DNI: <span className="text-base font-medium">{dni}</span>
        </h3>
      </div>

      <div className="flex flex-wrap w-full h-1/2">
        <div className="flex flex-row-reverse items-end justify-start w-1/2 gap-1 p-2 border-b border-r border-black h-1/2 ">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="flex flex-col items-center">
              <p className="text-xs text-[#6e6d6d]">{index + 11}</p>
              <Tooth
                key={index}
                toothNumber={index + 11}
                isActive={contextMenu === index + 11}
                setState={setContextMenu}
                selectedOption={selectedTreatments[index + 11]}
                onSelectOption={(option) =>
                  setSelectedTreatments((prev) => ({
                    ...prev,
                    [index + 11]: option,
                  }))
                }
              />
            </div>
          ))}
        </div>
        <div className="flex items-end justify-start w-1/2 gap-1 p-2 border-b border-l border-black h-1/2 ">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="flex flex-col items-center">
              <p className="text-xs text-[#6e6d6d]">{index + 21}</p>
              <Tooth
                key={index}
                toothNumber={index + 21}
                isActive={contextMenu === index + 21}
                setState={setContextMenu}
                selectedOption={selectedTreatments[index + 21]}
                onSelectOption={(option) =>
                  setSelectedTreatments((prev) => ({
                    ...prev,
                    [index + 21]: option,
                  }))
                }
              />
            </div>
          ))}
        </div>
        <div className="flex flex-row-reverse items-start justify-start w-1/2 gap-1 p-2 border-t border-r border-black h-1/2 ">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="flex flex-col-reverse items-center">
              <p className="text-xs text-[#6e6d6d]">{index + 41}</p>
              <Tooth
                key={index}
                toothNumber={index + 41}
                isActive={contextMenu === index + 41}
                setState={setContextMenu}
                selectedOption={selectedTreatments[index + 41]}
                onSelectOption={(option) =>
                  setSelectedTreatments((prev) => ({
                    ...prev,
                    [index + 41]: option,
                  }))
                }
              />
            </div>
          ))}
        </div>
        <div className="flex items-start justify-start w-1/2 gap-1 p-2 border-t border-l border-black h-1/2 ">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="flex flex-col-reverse items-center">
              <p className="text-xs text-[#6e6d6d]">{index + 31}</p>
              <Tooth
                key={index}
                toothNumber={index + 31}
                isActive={contextMenu === index + 31}
                setState={setContextMenu}
                selectedOption={selectedTreatments[index + 31]}
                onSelectOption={(option) =>
                  setSelectedTreatments((prev) => ({
                    ...prev,
                    [index + 31]: option,
                  }))
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap w-full h-1/2">
        <div className="flex flex-row-reverse items-end justify-start w-1/2 gap-1 p-2 border-b border-r border-black h-1/2 ">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex flex-col items-center">
              <p className="text-xs text-[#6e6d6d]">{index + 51}</p>
              <Tooth
                key={index}
                toothNumber={index + 51}
                isActive={contextMenu === index + 51}
                setState={setContextMenu}
                selectedOption={selectedTreatments[index + 51]}
                onSelectOption={(option) =>
                  setSelectedTreatments((prev) => ({
                    ...prev,
                    [index + 51]: option,
                  }))
                }
              />
            </div>
          ))}
        </div>
        <div className="flex items-end justify-start w-1/2 gap-1 p-2 border-b border-l border-black h-1/2 ">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex flex-col items-center">
              <p className="text-xs text-[#6e6d6d]">{index + 61}</p>
              <Tooth
                key={index}
                toothNumber={index + 61}
                isActive={contextMenu === index + 61}
                setState={setContextMenu}
                selectedOption={selectedTreatments[index + 61]}
                onSelectOption={(option) =>
                  setSelectedTreatments((prev) => ({
                    ...prev,
                    [index + 61]: option,
                  }))
                }
              />
            </div>
          ))}
        </div>
        <div className="flex flex-row-reverse items-start justify-start w-1/2 gap-1 p-2 border-t border-r border-black h-1/2 ">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex flex-col-reverse items-center">
              <p className="text-xs text-[#6e6d6d]">{index + 81}</p>
              <Tooth
                key={index}
                toothNumber={index + 81}
                isActive={contextMenu === index + 81}
                setState={setContextMenu}
                selectedOption={selectedTreatments[index + 81]}
                onSelectOption={(option) =>
                  setSelectedTreatments((prev) => ({
                    ...prev,
                    [index + 81]: option,
                  }))
                }
              />
            </div>
          ))}
        </div>
        <div className="flex items-start justify-start w-1/2 gap-1 p-2 border-t border-l border-black h-1/2 ">
          {" "}
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex flex-col-reverse items-center">
              <p className="text-xs text-[#6e6d6d]">{index + 71}</p>
              <Tooth
                key={index}
                toothNumber={index + 71}
                isActive={contextMenu === index + 71}
                setState={setContextMenu}
                selectedOption={selectedTreatments[index + 71]}
                onSelectOption={(option) =>
                  setSelectedTreatments((prev) => ({
                    ...prev,
                    [index + 71]: option,
                  }))
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
