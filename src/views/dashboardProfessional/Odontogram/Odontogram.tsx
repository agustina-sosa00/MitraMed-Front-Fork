import { useState } from "react";
import { Tooth } from "./Tooth";
import { ModalSelectFaceTooth } from "./ModalSelectFaceTooth";

export const Odontogram = () => {
  const [contextMenu, setContextMenu] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [toothSelect, setToothSelect] = useState<number>(0);

  const [teethState, setTeethState] = useState<{
    [key: number]: {
      action: string;
      tratamiento: string;
      cara: string;
    };
  }>({});

  const handleShowMenu = () => setContextMenu(null);
  const handleMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);

  const paciente = "Agustina Sosa";
  const dni = "11234567";

  const renderTeeth = (start: number, count: number, position: string) =>
    Array.from({ length: count }).map((_, i) => {
      const toothNumber = start + i;
      return (
        <div key={toothNumber} className="flex flex-col items-center">
          <p className="text-xs text-[#6e6d6d]">{toothNumber}</p>
          <Tooth
            toothNumber={toothNumber}
            isActive={contextMenu === toothNumber}
            setState={setContextMenu}
            position={position}
            handle={handleMenu}
            toothSelectState={toothSelect}
            setToothSelectState={setToothSelect}
            data={
              teethState[toothNumber] || {
                action: "",
                tratamiento: "",
                cara: "",
              }
            }
            updateTooth={(newData) =>
              setTeethState((prev) => ({
                ...prev,
                [toothNumber]: {
                  ...prev[toothNumber],
                  ...newData,
                },
              }))
            }
          />
        </div>
      );
    });

  return (
    <div
      className="flex flex-col w-full h-screen gap-5 px-5 py-20"
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
          {renderTeeth(11, 8, "arriba-izquierda")}
        </div>
        <div className="flex items-end justify-start w-1/2 gap-1 p-2 border-b border-l border-black h-1/2 ">
          {renderTeeth(21, 8, "arriba-derecha")}
        </div>
        <div className="flex flex-row-reverse items-start justify-start w-1/2 gap-1 p-2 border-t border-r border-black h-1/2 ">
          {renderTeeth(41, 8, "abajo-izquierda")}
        </div>
        <div className="flex items-start justify-start w-1/2 gap-1 p-2 border-t border-l border-black h-1/2 ">
          {renderTeeth(31, 8, "abajo-derecha")}
        </div>
      </div>

      <div className="flex flex-wrap w-full h-1/2">
        <div className="flex flex-row-reverse items-end justify-start w-1/2 gap-1 p-2 border-b border-r border-black h-1/2 ">
          {renderTeeth(51, 5, "arriba-izquierda-niño")}
        </div>
        <div className="flex items-end justify-start w-1/2 gap-1 p-2 border-b border-l border-black h-1/2 ">
          {renderTeeth(61, 5, "arriba-derecha-niño")}
        </div>
        <div className="flex flex-row-reverse items-start justify-start w-1/2 gap-1 p-2 border-t border-r border-black h-1/2 ">
          {renderTeeth(81, 5, "abajo-izquierda-niño")}
        </div>
        <div className="flex items-start justify-start w-1/2 gap-1 p-2 border-t border-l border-black h-1/2 ">
          {renderTeeth(71, 5, "abajo-derecha-niño")}
        </div>
      </div>

      {openMenu && (
        <ModalSelectFaceTooth
          show={openMenu}
          onClose={handleCloseMenu}
          setFace={(cara) =>
            setTeethState((prev) => ({
              ...prev,
              [toothSelect]: {
                ...prev[toothSelect],
                cara,
              },
            }))
          }
          action={teethState[toothSelect]?.action}
          setAction={(action) =>
            setTeethState((prev) => ({
              ...prev,
              [toothSelect]: {
                ...prev[toothSelect],
                action,
              },
            }))
          }
        />
      )}
    </div>
  );
};
