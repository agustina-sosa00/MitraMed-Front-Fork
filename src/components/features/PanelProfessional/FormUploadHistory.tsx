import React, { useState } from "react";
import { InputProfessional } from "./InputProfessional";
import { UploadStudy } from "@/views/dashboardProfessional/UploadStudy";
import { renameFile } from "@/utils/renameFile";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { IArrayTableHistorial } from "@/types/index";
import { useContextDropbox } from "../../../context/DropboxContext";
import {
  downloadFileDropbox,
  uploadFileDropbox,
} from "@/services/dropboxServices";

interface IProp {
  hc: string;
  setState: React.Dispatch<React.SetStateAction<IArrayTableHistorial[]>>;
  infoProfessional: {
    adoctor: string;
    ndoctor: string;
  };
  handle?: () => void;
  focusState?: boolean;
  folder: string;
}
export const FormUploadHistory: React.FC<IProp> = ({
  setState,
  infoProfessional,
  handle,
  focusState,
  folder,
}) => {
  // ----------------------------------------------
  // ------T O K E N  D E  D R O P B O X-----------
  // ----------------------------------------------
  const { token } = useContextDropbox();

  const [dataForm, setDataForm] = useState({
    motivo: "",
    descripcion: "",
    archivo: "",
    medicamentos: "",
  });
  const [image, setImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileSaved, setFileSaved] = useState<File | null>(null);

  // -----------------------------------------------
  // -----------------------------------------------
  // ----state que se manda a uploadFileDropbox----
  // -----------------------------------------------
  // -----------------------------------------------
  // const [dataToSendDropbox, setDataToSendDropbox] = useState();

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

  //  MUTATE PARA GUARDAR ARCHIVOS EN EL DROPBOX
  const { mutateAsync } = useMutation({
    mutationFn: uploadFileDropbox,
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    },
    onSuccess: (data) => {
      if (data) {
        Swal.fire({
          icon: "success",
          title: "Información guardada con éxito",
          confirmButtonColor: "#518915",
        });
      }
    },
  });

  //  MUTATE PARA DESCARGAR ARCHIVOS EN EL VPS
  const { mutate: mutateDownload } = useMutation({
    mutationFn: downloadFileDropbox,
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    },
    onSuccess: (data) => {
      // aca el back nos devuelve un blob
      // lo convertimos a una url valida para mostrar el archivo
      const url = URL.createObjectURL(data);
      setImage(url);
    },
  });

  // ------------------------------
  // handle para guardar el archivo
  // ------------------------------
  const handleOnClickSave = async () => {
    if (!file) {
      return;
    }
    const newFile = renameFile(file);
    setFileSaved(newFile);
    try {
      await mutateAsync({
        fileNameError: file.name,
        file: newFile!,
        token: token,
        folder: folder,
      });

      // estado para guardar la info en la tabla
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
          profesional:
            infoProfessional.adoctor + " " + infoProfessional.ndoctor,
        },
      ]);

      // vaciar el estado del formulario
      setDataForm({
        motivo: "",
        descripcion: "",
        archivo: "",
        medicamentos: "",
      });
      setFile(null);
    } catch (error) {
      // manejar el error
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
      return;
    }
    mutateDownload({
      token: token,
      folder: folder,
      archivo: fileSaved!.name,
    });
  };

  return (
    <div className="flex flex-col items-start justify-center w-1/2 gap-2 p-3 bg-white border border-gray-300 rounded">
      <div className="flex justify-center w-full">
        <h1 className="text-xl font-bold text-center text-blue">
          Agregar datos de la consulta
        </h1>
      </div>
      <form
        className="flex flex-col w-full gap-2"
        action=""
        onClick={() => {
          handle!();
        }}
      >
        <InputProfessional
          valueInput={dataForm.motivo}
          nameInput="motivo"
          handleInput={handleOnChangeInput}
          placeholderInput={"control"}
          labelInput={"motivo de consulta"}
          field={true}
          focusState={focusState}
          focusName={"motivo"}
        />
        <InputProfessional
          valueInput={dataForm.descripcion}
          nameInput="descripcion"
          handleTextarea={handleOnChangeTextarea}
          placeholderInput={"Peso: 57kg talla: 1.70m"}
          labelInput={"descripción"}
          focusState={focusState}
          focusName={"descripcion"}
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
            type="button"
            onClick={handleOnDownload}
            className={`text-center gap-2 px-5  py-1   font-medium  capitalize rounded bg-blue  text-white  cursor-pointer transition-all duration-300  `}
          >
            Descargar img
          </button>
          <button
            type="button"
            onClick={handleOnClickSave}
            className={`text-center gap-2 px-5  py-1   font-medium  capitalize rounded bg-green hover:bg-greenHover text-white  cursor-pointer transition-all duration-300  `}
          >
            Agregar datos
          </button>
        </div>
      </form>
      <div className="whitespace-pre-line">
        imagen descargada:{}
        {image && (
          <img src={image} alt="Imagen descargada" style={{ width: "200px" }} />
        )}
      </div>
    </div>
  );
};
