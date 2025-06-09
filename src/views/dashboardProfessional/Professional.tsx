import React from "react";

export const Professional: React.FC = () => {
  const name = "Dr. Juan Lopez";
  return (
    <div className="flex items-start justify-center w-full h-screen py-10 bg-white ">
      <div className="w-[80%] h-[60%] flex flex-col justify-start items-center   ">
        <h1 className="text-4xl font-medium uppercase text-green">
          ¡Bienvenido {name}!
        </h1>
        {/* <div className="flex justify-center w-full gap-5 bg-red-300">
          <div className="bg-black w-96 h-52"></div>
          <div className="w-64 bg-black h-52"></div>
        </div> */}
      </div>
    </div>
  );
};
