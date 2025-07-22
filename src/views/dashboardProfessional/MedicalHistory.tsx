import React, { useState } from "react";
import { UploadStudy } from "./UploadStudy";
import { SearchPatient } from "@/components/features/PanelProfessional/SearchPatient";

export const MedicalHistory: React.FC = () => {
  const [infoUser, setInfoUser] = useState<boolean>(false);

  const handleFindPatient = () => {
    setInfoUser(!infoUser);
  };
  return (
    <div className="w-full min-h-screen px-10 pt-10">
      <div className="flex flex-col w-full ">
        <h1 className="text-2xl font-medium uppercase lg:text-4xl text-green">
          Historial médico
        </h1>
      </div>

      <div className="flex items-center justify-start w-full h-16 gap-1 py-1 ">
        <SearchPatient
          infoUser={infoUser}
          handleFindPatient={handleFindPatient}
          viewImg={false}
        />
      </div>

      <UploadStudy />
    </div>
  );
};
