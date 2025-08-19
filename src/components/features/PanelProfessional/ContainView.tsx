import React from "react";

interface IProp {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
  padding?: string;
  gapChildren?: string;
}

export const ContainView: React.FC<IProp> = ({
  children,
  title,
  onClick,
  padding,
  gapChildren,
}) => {
  function handleClick() {
    onClick && onClick();
  }
  return (
    <div
      className={`flex flex-col items-center w-full min-h-screen gap-5  overflow-y-auto ${
        padding ? padding : "px-5 py-20"
      } `}
      onClick={handleClick}
    >
      <div
        className={`lg:w-[85%] flex flex-col items-center ${
          gapChildren ? gapChildren : "gap-5"
        }`}
      >
        <h1 className="text-2xl font-medium uppercase lg:text-4xl text-green">
          {title}
        </h1>

        <div className="flex flex-col items-center justify-center w-full ">
          {children}
        </div>
      </div>
    </div>
  );
};
