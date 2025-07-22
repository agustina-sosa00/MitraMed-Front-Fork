import React, { useState } from "react";
import { SearchPatient } from "@/components/features/PanelProfessional/SearchPatient";
import { FormUploadHistory } from "@/components/features/PanelProfessional/FormUploadHistory";

export const MedicalHistory: React.FC = () => {
  const [infoUser, setInfoUser] = useState<boolean>(false);

  const handleFindPatient = () => {
    setInfoUser(!infoUser);
  };
  return (
    <div className="flex flex-col w-full min-h-screen px-10 pt-10 ">
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

      <div className="flex w-full ">
        <div className="w-1/2">as</div>
        <FormUploadHistory />
      </div>
    </div>
  );
};
