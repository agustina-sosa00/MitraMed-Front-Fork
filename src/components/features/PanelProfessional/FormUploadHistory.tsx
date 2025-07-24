import React, { useState } from "react";
import { InputProfessional } from "./InputProfessional";
import { UploadStudy } from "@/views/dashboardProfessional/UploadStudy";
import { renameFile } from "@/utils/renameFile";
import { useMutation } from "@tanstack/react-query";
import {
  downloadArchive,
  updateArchive,
} from "@/services/UploadArchiveServices";
import Swal from "sweetalert2";

interface IProp {
  hc: string;
}
export const FormUploadHistory: React.FC<IProp> = () => {
  const [dataForm, setDataForm] = useState({
    motivo: "",
    descripcion: "",
    archivo: "",
    medicamentos: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [fileSaved, setFileSaved] = useState<File | null>(null);
  console.log("fileSaved", fileSaved);
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

  //  MUTATE PARA GUARDAR ARCHIVOS EN EL VPS
  const { mutate } = useMutation({
    mutationFn: updateArchive,
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    },
    onSuccess: (data) => {
      console.log("DATA QUE DEVUELVE EL BACK EN FILE", data);
    },
  });

  //  MUTATE PARA DESCARGAR ARCHIVOS EN EL VPS
  const { mutate: mutateDownload } = useMutation({
    mutationFn: downloadArchive,
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    },
    onSuccess: (data) => {
      console.log("DATA QUE DEVUELVE EL BACK EN DOWNLOAD FILE", data);
    },
  });

  const handleOnClickSave = () => {
    // handle que se ejecuta al "agregar datos btn"
    if (file) {
      const newFile = renameFile(file);
      console.log("newFile", newFile);
      setFileSaved(newFile);
      newFile && mutate(newFile);
    } else {
      console.log("fileSaved", fileSaved);
    }
  };

  const handleOnDownload = () => {
    if (!fileSaved) {
      console.log("No hay archivo para descargar");
      return;
    }
    mutateDownload(fileSaved.name);
  };

  return (
    <div className="flex flex-col items-start justify-center w-1/2 gap-2 p-3 bg-white border border-gray-300 rounded">
      <div className="flex justify-center w-full">
        <h1 className="text-xl font-bold text-center text-blue">
          Agregar datos de la consulta
        </h1>
      </div>

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
        <UploadStudy setState={setFile} />
      </div>
      <div className="flex justify-end w-full gap-5">
        <button
          onClick={handleOnDownload}
          className={`text-center gap-2 px-5  py-1   font-medium  capitalize rounded bg-blue  text-white  cursor-pointer transition-all duration-300  `}
        >
          Descargar img
        </button>
        <button
          onClick={handleOnClickSave}
          className={`text-center gap-2 px-5  py-1   font-medium  capitalize rounded bg-green hover:bg-greenHover text-white  cursor-pointer transition-all duration-300  `}
        >
          Agregar datos
        </button>
      </div>
      {/* <div className="whitespace-pre-line">{dataForm.descripcion}</div> */}
    </div>
  );
};
