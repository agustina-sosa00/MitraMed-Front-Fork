import React from "react";
import { ImgAbout } from "./ImgAbout";
import { InfoAbout } from "./InfoAbout";

interface AboutCardProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  currentRol?: "paciente" | "profesional";
  handleOpenDrawer: (rol: "paciente") => void;
  handleCloseDrawer: () => void;
}

export default function AboutCard({
  state,
  setState,
  currentRol,
  handleCloseDrawer,
  handleOpenDrawer,
}: AboutCardProps) {
  return (
    <div className="flex flex-col  lg:flex-row items-center justify-between w-full py-5 h-auto lg:h-screen  bg-[#f1f1f1]">
      <ImgAbout />

      <InfoAbout
        state={state}
        setState={setState}
        currentRol={currentRol}
        handleOpenDrawer={handleOpenDrawer}
        handleCloseDrawer={handleCloseDrawer}
      />
    </div>
  );
}
