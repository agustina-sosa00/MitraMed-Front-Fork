import React from "react";
import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-5">
      <h1 className="text-4xl font-medium tracking-wide uppercase text-blue">
        ¡UPSS!
      </h1>
      <div className="flex flex-col items-center justify-center">
        <img src="/icons/programmer.png" alt="programmer" className="w-20" />
        <p className="text-blue">La página que buscas esta en desarrollo</p>
        <p className="text-blue">Volve en otro momento</p>
      </div>
      <Link
        to={"/profesionales/inicio"}
        className="px-2 py-1 font-medium text-white rounded bg-blue"
      >
        Volver al inicio
      </Link>
    </div>
  );
};
