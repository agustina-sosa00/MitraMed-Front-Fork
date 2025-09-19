import React from "react";
import { LuStethoscope } from "react-icons/lu";
import { FaMedkit } from "react-icons/fa";
import { BiNotepad } from "react-icons/bi";

export const CardsAbout: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full gap-10 lg:gap-28 p-10 bg-[#f1f1f1]">
      <div className="flex flex-col items-center justify-center w-48 h-40 gap-5 bg-white shadow-sm lg:h-52 lg:w-60 rounded-xl ">
        <FaMedkit className="font-extrabold w-14 h-14 lg:w-20 lg:h-20 text-primaryGreen" />
        <h2 className="text-xl font-semibold capitalize lg:text-2xl text-primaryBlue">
          19 especialidades
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center w-48 h-40 gap-5 bg-white lg:h-52 lg:w-60 rounded-xl ">
        <LuStethoscope className="font-extrabold w-14 h-14 lg:w-20 lg:h-20 text-primaryGreen" />
        <h2 className="text-xl font-semibold capitalize lg:text-2xl text-primaryBlue ">
          24 profesionales
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center w-48 h-40 gap-5 bg-white lg:h-52 lg:w-60 rounded-xl ">
        <BiNotepad className="font-bold w-14 h-14 lg:w-20 lg:h-20 text-primaryGreen" />
        <h2 className="text-xl font-semibold capitalize lg:text-2xl text-primaryBlue">
          turnos en el acto
        </h2>
      </div>
    </div>
  );
};
