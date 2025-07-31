import React from "react";
interface IProp {
  handle?: () => void;
  label?: string;
  classButton?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit";
  loader?: boolean;
}

export const Button: React.FC<IProp> = ({
  handle,
  label,
  classButton,
  icon,
  type,
  loader,
}) => {
  return (
    <button
      type={type}
      onClick={handle}
      className={`text-center cursor-pointer capitalize font-medium  gap-2 transition-all duration-300 ${
        classButton
          ? classButton
          : " h-10 flex items-center  px-5 py-1  rounded bg-green hover:bg-greenHover text-white"
      } `}
    >
      {loader ? (
        <svg
          className="w-5 h-5 circle-loader animate-spin"
          viewBox="25 25 50 50"
        >
          <circle r="20" cy="50" cx="50" className="circleWhite"></circle>
        </svg>
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </button>
  );
};
