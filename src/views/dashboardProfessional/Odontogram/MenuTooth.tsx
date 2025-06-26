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
  return (
    <div
      className={`absolute z-50 h-20 flex flex-col justify-between border rounded border-gray-300 w-52`}
      style={{ top: positionMenu.y, left: positionMenu.x }}
    >
      <div className="relative rounded-t group h-1/2">
        <div className="flex items-center justify-between w-full h-full px-3 py-2 text-sm transition-all duration-300 bg-white border-b border-gray-300 rounded-t cursor-pointer text-blue group-hover:text-white group-hover:bg-green">
          Realizado <IoIosArrowDown className="-rotate-90" />
        </div>
        <div
          className={`absolute top-0 hidden bg-white group-hover:block ${
            width ? "left-full" : "right-full"
          }`}
        >
          <ButtonSubMenu
            width={width}
            actionText="realizado"
            updateTooth={updateTooth}
            handle={handle}
          />
        </div>
      </div>
      <div className="relative rounded-b group h-1/2">
        <div className="flex items-center justify-between w-full h-full px-3 py-2 text-sm transition-all duration-300 bg-white rounded-b cursor-pointer text-blue group-hover:text-white group-hover:bg-green">
          A realizar <IoIosArrowDown className="-rotate-90" />
        </div>
        <div
          className={`absolute top-0 hidden bg-white group-hover:block ${
            width ? "left-full" : "right-full"
          }`}
        >
          <ButtonSubMenu
            width={width}
            actionText="a realizar"
            updateTooth={updateTooth}
            handle={handle}
          />
        </div>
      </div>
    </div>
  );
};
