import React, { useState } from "react";
import { InputProfessional } from "./InputProfessional";
import { UploadStudy } from "@/views/dashboardProfessional/UploadStudy";

export const FormUploadHistory: React.FC = () => {
  const [dataForm, setDataForm] = useState({
    motivo: "",
    descripcion: "",
    archivo: "",
    medicamentos: "",
  });
  console.log("dataForm", dataForm);
  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };
  const handleOnChangeTextarea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  return (
    <div className="flex flex-col items-start justify-center w-1/2 gap-2 p-3 bg-white border border-gray-300">
      <InputProfessional
        valueInput={dataForm.motivo}
        nameInput="motivo"
        handleInput={handleOnChangeInput}
        placeholderInput={"control"}
        labelInput={"motivo de consulta"}
        field={true}
      />
      <InputProfessional
        valueInput={dataForm.descripcion}
        nameInput="descripcion"
        handleTextarea={handleOnChangeTextarea}
        placeholderInput={"Peso: 57kg talla: 1.70m"}
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
      <div className="whitespace-pre-line">{dataForm.descripcion}</div>
    </div>
  );
};
