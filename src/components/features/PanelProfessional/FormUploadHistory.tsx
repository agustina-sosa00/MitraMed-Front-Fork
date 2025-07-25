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
import { IArrayTableHistorial } from "@/types/index";

interface IProp {
  hc: string;
  setState: React.Dispatch<React.SetStateAction<IArrayTableHistorial[]>>;
}
export const FormUploadHistory: React.FC<IProp> = ({ setState }) => {
  const [dataForm, setDataForm] = useState({
    motivo: "",
    descripcion: "",
    archivo: "",
    medicamentos: "",
  });
  console.log("dataForm", dataForm);
  const [image, setImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileSaved, setFileSaved] = useState<File | null>(null);

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
  const { mutateAsync } = useMutation({
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
      // aca el back nos devuelve un blob
      // lo convertimos a una url valida para mostrar el archivo
      const url = URL.createObjectURL(data);
      setImage(url);
    },
  });

  const handleOnClickSave = async () => {
    if (!file) {
      console.log("No hay archivo seleccionado");
      return;
    }

    const newFile = renameFile(file);
    setFileSaved(newFile);
    try {
      await mutateAsync(newFile!);

      const updatedForm = {
        ...dataForm,
        archivo: newFile!.name,
      };
      setState((prev: IArrayTableHistorial[]) => [
        ...prev,
        {
          id: Date.now(),
          fecha: new Date().toISOString(),
          motivo: dataForm.motivo,
          data: {
            description: dataForm.descripcion,
            archivo: newFile!.name,
            medicamentos: dataForm.medicamentos,
          },
          profesional: "Profesional",
        },
      ]);
      setDataForm({
        motivo: "",
        descripcion: "",
        archivo: "",
        medicamentos: "",
      });
      setFile(null);
      console.log("Datos guardados:", updatedForm);
    } catch (error) {
      console.error("Error al subir archivo:", error);
      Swal.fire({
        icon: "error",
        title: "Error al subir el archivo",
        text: error instanceof Error ? error.message : "Error desconocido",
      });
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
        <UploadStudy setState={setFile} state={file!} />
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
      <div className="whitespace-pre-line">
        imagen descargada:{}
        {image && (
          <img src={image} alt="Imagen descargada" style={{ width: "200px" }} />
        )}
      </div>
    </div>
  );
};
