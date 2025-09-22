import React, { Dispatch, SetStateAction, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuEraser } from "react-icons/lu";
import Cookies from "js-cookie";

import Swal from "sweetalert2";
import { ToothChangeTuple, ToothItemIds } from "../types/odontogramaTypes";

interface MenuToothProps {
  positionMenu: { x: number; y: number };
  width: boolean;
  updateToothIds: (item: ToothItemIds) => void;
  handle: () => void;
  tooth: number;
  clearTooth: () => void;
  onClose: () => void;
  stateTeethChanged?: Dispatch<SetStateAction<ToothChangeTuple[]>>;
  toothNumber: number;
  dataIds: ToothItemIds[];
}

const ITEMS = [
  { label: "Extracción", base: 1 as const },
  { label: "Corona", base: 2 as const },
  { label: "Sellados", base: 3 as const },
  { label: "Restauraciones", base: 4 as const },
];

function buildIdTrat(base: 1 | 2 | 3 | 4, action: "realizado" | "a realizar") {
  return action === "a realizar" ? base + 100 : base;
}

function needsFace(base: 1 | 2 | 3 | 4) {
  return base === 3 || base === 4;
}

export const MenuDiente: React.FC<MenuToothProps> = ({
  positionMenu,
  width,
  updateToothIds,
  handle,
  clearTooth,
  onClose,
  stateTeethChanged,
  toothNumber,
  dataIds,
}) => {
  //region cookies
  const info = Cookies.get("dataProfessional");
  const profesional = info && JSON.parse(info);

  //region context

  //region states
  const [openSubMenu, setOpenSubMenu] = useState<"realizado" | "a realizar" | null>(null);

  //region functions
  function pick(base: 1 | 2 | 3 | 4, action: "realizado" | "a realizar") {
    const idtrat = buildIdTrat(base, action);
    updateToothIds([0, idtrat, 1]);
    if (!needsFace(base) && stateTeethChanged) {
      stateTeethChanged((prev) => [
        ...prev,
        [toothNumber, 0, idtrat, 1, Number(profesional.idprofesional)],
      ]);
    }
    onClose();
    if (needsFace(base)) {
      handle();
    }
  }

  function handleClear() {
    Swal.fire({
      title: "¿Desea Limpiar el Diente?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, Limpiar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#518915",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (!result.isConfirmed) return;
      const idprof = Number(profesional?.idprofesional ?? 0);

      if (stateTeethChanged && dataIds.length > 0) {
        const toDisable: ToothChangeTuple[] = dataIds.map(
          ([idcara, idtrat]) => [toothNumber, idcara, idtrat, 0, idprof] as ToothChangeTuple,
        );
        stateTeethChanged((prev) => [...prev, ...toDisable]);
      }
      clearTooth();

      onClose();
    });
  }
  //region return
  return (
    <div
      className="fixed z-50 flex flex-col bg-white border border-gray-300 rounded w-52"
      style={{ top: positionMenu.y, left: positionMenu.x }}
    >
      <div className="relative">
        {
          //region realizado
        }
        <div
          onMouseEnter={() => setOpenSubMenu("realizado")}
          onMouseLeave={() => setOpenSubMenu(null)}
        >
          <div
            className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-t cursor-pointer text-primaryBlue hover:text-white transition-all duration-300 hover:bg-primaryGreen ${
              openSubMenu === "realizado" ? "bg-primaryGreen text-white" : ""
            }`}
          >
            Realizado <IoIosArrowDown className="-rotate-90" />
          </div>

          {openSubMenu === "realizado" && (
            <div
              className={`absolute bottom-0 ${width ? "left-full" : "right-full"} bg-white shadow`}
            >
              {ITEMS.map((it) => (
                <button
                  key={it.base}
                  className="block px-3 py-2 text-sm text-left transition-all duration-300 w-44 hover:bg-primaryGreen hover:text-white"
                  onClick={() => pick(it.base, "realizado")}
                >
                  {it.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {
          //region a realizar
        }
        <div
          onMouseEnter={() => setOpenSubMenu("a realizar")}
          onMouseLeave={() => setOpenSubMenu(null)}
        >
          <div
            className={`flex items-center justify-between w-full px-3 py-2 text-sm cursor-pointer text-primaryBlue transition-all duration-300 hover:text-white hover:bg-primaryGreen ${
              openSubMenu === "a realizar" ? "bg-primaryGreen text-white" : ""
            }`}
          >
            A Realizar <IoIosArrowDown className="-rotate-90" />
          </div>

          {openSubMenu === "a realizar" && (
            <div
              className={`absolute bottom-0 ${width ? "left-full" : "right-full"} bg-white shadow`}
            >
              {ITEMS.map((it) => (
                <button
                  key={it.base}
                  className="block px-3 py-2 text-sm text-left transition-all duration-300 w-44 hover:bg-primaryGreen hover:text-white"
                  onClick={() => pick(it.base, "a realizar")}
                >
                  {it.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {
          //region limpiar
        }
        <button
          className="flex items-center justify-between w-full px-3 py-2 text-sm text-red-600 transition-all duration-300 rounded-b hover:bg-red-600 hover:text-white"
          onClick={handleClear}
        >
          Limpiar Marcas <LuEraser />
        </button>
      </div>
    </div>
  );
};
