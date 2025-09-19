import React from "react";

interface IProp {
  children: React.ReactNode;
  title: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  padding?: string;
  gapChildren?: string;
  sizeTitle?: string;
  classContainer?: string;
}

export const ContainView: React.FC<IProp> = ({
  children,
  title,
  onClick,
  padding,
  gapChildren,
  sizeTitle,
  classContainer,
}) => {
  return (
    <div
      className={`flex flex-col items-center  w-full min-h-screen gap-5  overflow-y-auto ${
        padding ? padding : "px-5 py-20"
      }`}
      onClick={onClick}
    >
      <div
        className={`lg:w-full flex flex-col items-center ${gapChildren ? gapChildren : "gap-2"}`}
      >
        <h1
          className={` font-medium uppercase  text-primaryGreen ${
            sizeTitle ? sizeTitle : "text-2xl lg:text-4xl"
          } `}
        >
          {title}
        </h1>
        <div className="w-full border border-gray-300"></div>
        <div className={`flex flex-col items-center justify-start w-full  ${classContainer} `}>
          {children}
        </div>
      </div>
    </div>
  );
};
