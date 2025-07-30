import React from "react";
interface IProp {
  handle: () => void;
  label: string;
  classButton?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<IProp> = ({
  handle,
  label,
  classButton,
  icon,
}) => {
  return (
    <button
      type="button"
      onClick={handle}
      className={`text-center cursor-pointer transition-all duration-300 ${
        classButton
          ? classButton
          : "px-5 py-1 gap-2 font-medium capitalize rounded bg-green hover:bg-greenHover text-white"
      } `}
    >
      {label} {icon}
    </button>
  );
};
