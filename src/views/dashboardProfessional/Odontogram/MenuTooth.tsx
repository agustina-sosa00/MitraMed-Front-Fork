import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { ButtonSubMenu } from "./ButtonSubMenu";

interface MenuToothProps {
  positionMenu: { x: number; y: number };
  width: boolean;
  updateTooth: (newData: { action?: string; tratamiento?: string }) => void;
  handle: () => void;
}

export const MenuTooth: React.FC<MenuToothProps> = ({
  positionMenu,
  width,
  updateTooth,
  handle,
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
          className={`flex items-center justify-between w-full h-full px-3 py-2 text-sm rounded-t cursor-pointer text-blue hover:text-white hover:bg-green ${
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
          className={`flex items-center justify-between w-full h-full px-3 py-2 text-sm rounded-b cursor-pointer text-blue hover:text-white hover:bg-green ${
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
    </div>
  );
};
