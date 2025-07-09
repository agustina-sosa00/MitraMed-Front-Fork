import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { ButtonSubMenu } from "./ButtonSubMenu";
import { LuEraser } from "react-icons/lu";

interface MenuToothProps {
  positionMenu: { x: number; y: number };
  width: boolean;
  updateTooth: (newData: {
    action?: string;
    tratamiento?: string;
    cara?: string;
  }) => void;
  handle: () => void;
  tooth: number;
  clearTooth: () => void;
}

export const MenuTooth: React.FC<MenuToothProps> = ({
  positionMenu,
  width,
  updateTooth,
  handle,
  clearTooth,
}) => {
  const [openSubMenu, setOpenSubMenu] = useState<
    "realizado" | "a realizar" | null
  >(null);

  return (
    <div
      className={`absolute z-50 flex flex-col border rounded border-gray-300 w-52 bg-white`}
      style={{ top: positionMenu.y, left: positionMenu.x }}
    >
      <div
        className="relative h-1/2"
        onMouseEnter={() => setOpenSubMenu("realizado")}
        onMouseLeave={() => setOpenSubMenu(null)}
      >
        <div
          className={`flex items-center justify-between transition-all duration-300 w-full h-full px-3 py-2 text-sm rounded-t cursor-pointer text-blue hover:text-white hover:bg-green ${
            openSubMenu === "realizado" && "bg-green text-white "
          } `}
        >
          Realizado <IoIosArrowDown className="-rotate-90" />
        </div>
        {openSubMenu === "realizado" && (
          <div
            className={`absolute top-0 ${
              width ? "left-full" : "right-full"
            } bg-white`}
          >
            <ButtonSubMenu
              width={width}
              actionText="realizado"
              updateTooth={updateTooth}
              handle={handle}
              y={positionMenu.y}
            />
          </div>
        )}
      </div>

      <div
        className="relative h-1/2"
        onMouseEnter={() => setOpenSubMenu("a realizar")}
        onMouseLeave={() => setOpenSubMenu(null)}
      >
        <div
          className={`flex items-center justify-between w-full transition-all duration-300 h-full px-3 py-2 text-sm  cursor-pointer text-blue hover:text-white hover:bg-green ${
            openSubMenu === "a realizar" && "bg-green text-white"
          } `}
        >
          A realizar <IoIosArrowDown className="-rotate-90" />
        </div>
        {openSubMenu === "a realizar" && (
          <div
            className={`absolute top-0 ${
              width ? "left-full" : "right-full"
            } bg-white`}
          >
            <ButtonSubMenu
              width={width}
              actionText="a realizar"
              updateTooth={updateTooth}
              handle={handle}
              y={positionMenu.y}
            />
          </div>
        )}
      </div>

      <div className="relative h-1/2" onMouseLeave={() => setOpenSubMenu(null)}>
        <div
          className={`flex items-center justify-between w-full h-full px-3 py-2 text-sm rounded-b cursor-pointer text-red-600 transition-all duration-300  font-medium hover:bg-[#dddddd] `}
          onClick={clearTooth}
        >
          Limpiar diente <LuEraser />
        </div>
      </div>
    </div>
  );
};
