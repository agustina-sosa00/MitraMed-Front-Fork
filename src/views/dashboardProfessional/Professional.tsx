import React from "react";

export const Professional: React.FC = () => {
  const name = "Agustina";
  return (
    <div className="flex items-start justify-center w-full h-screen py-10">
      <div className="w-[80%] h-[60%] flex justify-center items-start rounded text-green font-medium text-2xl ">
        ¡Bienvenido {name}!
      </div>
    </div>
  );
};
