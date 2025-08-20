import React, { Dispatch, SetStateAction, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuEraser } from "react-icons/lu";
import Cookies from "js-cookie";

import { ToothChangeTuple, ToothItemIds } from "@/types/index";
import Swal from "sweetalert2";

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

export const MenuTooth: React.FC<MenuToothProps> = ({
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
  //region states
  const [openSubMenu, setOpenSubMenu] = useState<
    "realizado" | "a realizar" | null
  >(null);

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
      title: "¿Desea limpiar el diente?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#518915",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        if (stateTeethChanged && dataIds.length > 0) {
          const idprof = Number(profesional.idprofesional);
          dataIds.forEach(([idcara, idtrat]) => {
            stateTeethChanged((prev) => [
              ...prev,
              [toothNumber, idcara, idtrat, 0, idprof],
            ]);
          });
        }
        clearTooth();
        onClose();
      }
    });
  }
  //region return
  return (
    <div
      className="fixed z-50 flex flex-col bg-white border border-gray-300 rounded w-52"
      style={{ top: positionMenu.y, left: positionMenu.x }}
    >
      {
        //region realizado
      }
      <div
        className="relative"
        onMouseEnter={() => setOpenSubMenu("realizado")}
        onMouseLeave={() => setOpenSubMenu(null)}
      >
        <div
          className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-t cursor-pointer text-blue hover:text-white hover:bg-green ${
            openSubMenu === "realizado" ? "bg-green text-white" : ""
          }`}
        >
          Realizado <IoIosArrowDown className="-rotate-90" />
        </div>

        {openSubMenu === "realizado" && (
          <div
            className={`absolute top-0 ${
              width ? "left-full" : "right-full"
            } bg-white shadow`}
          >
            {ITEMS.map((it) => (
              <button
                key={it.base}
                className="block w-44 px-3 py-2 text-left text-sm hover:bg-[#eeeeee]"
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
        className="relative"
        onMouseEnter={() => setOpenSubMenu("a realizar")}
        onMouseLeave={() => setOpenSubMenu(null)}
      >
        <div
          className={`flex items-center justify-between w-full px-3 py-2 text-sm cursor-pointer text-blue hover:text-white hover:bg-green ${
            openSubMenu === "a realizar" ? "bg-green text-white" : ""
          }`}
        >
          A realizar <IoIosArrowDown className="-rotate-90" />
        </div>

        {openSubMenu === "a realizar" && (
          <div
            className={`absolute top-0 ${
              width ? "left-full" : "right-full"
            } bg-white shadow`}
          >
            {ITEMS.map((it) => (
              <button
                key={it.base}
                className="block w-44 px-3 py-2 text-left text-sm hover:bg-[#eeeeee]"
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
        className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-b text-red-600 hover:bg-[#dddddd]"
        onClick={handleClear}
      >
        Limpiar diente <LuEraser />
      </button>
    </div>
  );
};
