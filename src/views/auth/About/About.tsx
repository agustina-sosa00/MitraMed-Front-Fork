import React from "react";
import { ImgAbout } from "./ImgAbout";
import { InfoAbout } from "./InfoAbout";
interface IProp {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}
export const About = ({ state, setState }: IProp) => {
  return (
    <div className="flex flex-col  lg:flex-row items-center justify-between w-full py-5 h-auto lg:h-screen  bg-[#f1f1f1]">
      <ImgAbout />

      <InfoAbout state={state} setState={setState} />
    </div>
  );
};
