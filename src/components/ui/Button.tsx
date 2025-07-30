import React from "react";
interface IProp {
  handle: () => void;
  label: string;
  classButton?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit";
}

export const Button: React.FC<IProp> = ({
  handle,
  label,
  classButton,
  icon,
  type,
}) => {
  return (
    <button
      type={type}
      onClick={handle}
      className={`text-center cursor-pointer capitalize font-medium  gap-2 transition-all duration-300 px-5 py-1 ${
        classButton
          ? classButton
          : " h-10 flex items-center  rounded bg-green hover:bg-greenHover text-white"
      } `}
    >
      {icon}
      {label}
    </button>
  );
};
