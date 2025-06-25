import React from "react";
interface ButtonSubMenuProps {
  width: boolean;
  actionText: "realizado" | "a realizar";
  onSelect: (option: {
    action: "realizado" | "a realizar";
    tratamiento: string;
  }) => void;
}
const treatmentList = ["Extracción", "Corona", "Sellado"];

export const ButtonSubMenu: React.FC<ButtonSubMenuProps> = ({
  width,
  actionText,
  onSelect,
}) => {
  return (
    <div
      className={`absolute top-0 hidden bg-white border border-gray-300 rounded group-hover:block ${
        width ? "left-full" : "right-full"
      }`}
    >
      {treatmentList.map((item, index) => (
        <button
          key={item}
          onClick={() =>
            onSelect({
              action: actionText,
              tratamiento: item,
            })
          }
          className={`w-44 px-3 py-2 text-start text-sm border-b cursor-pointer hover:text-white hover:bg-green transition-all duration-300 border-gray-300 ${
            index === 0 && "rounded-t"
          }`}
        >
          {item}
        </button>
      ))}
      <button
        className={`w-44 px-3 py-2 text-start text-sm border-b cursor-pointer hover:text-white hover:bg-green transition-all duration-300 border-gray-300 rounded-b`}
      >
        Restauraciones
      </button>
    </div>
  );
};
