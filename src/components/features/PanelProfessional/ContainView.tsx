import React from "react";

interface IProp {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
}

export const ContainView: React.FC<IProp> = ({ children, title }) => {
  return (

    <div className="flex flex-col items-center w-full min-h-screen gap-5 px-5 py-20 overflow-y-auto">

      <div className="lg:w-[85%] flex flex-col items-center gap-5">
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
