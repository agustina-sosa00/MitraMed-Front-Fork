import React from "react";
import { InputProfessional } from "./InputProfessional";
import { UploadStudy } from "@/views/dashboardProfessional/UploadStudy";

export const FormUploadHistory: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-center w-1/2 gap-2 p-3 bg-white border border-gray-300">
      <InputProfessional
        placeholderInput={"jajaj"}
        labelInput={"motivo de consulta"}
        field={true}
      />
      <InputProfessional
        placeholderInput={"jajaj"}
        labelInput={"descripción"}
      />
      <div className="flex w-full">
        <div className=" w-36">
          <label
            htmlFor=""
            className="mr-2 text-sm font-medium capitalize text-blue"
          >
            Subir archivo:
          </label>
        </div>
        <UploadStudy />
      </div>
    </div>
  );
};
