import React, { useState } from "react";
import { InputProfessional } from "./InputProfessional";
import { UploadStudy } from "@/views/dashboardProfessional/UploadStudy";
import { renameFile } from "@/utils/renameFile";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { IArrayTableHistorial } from "@/types/index";
import { useContextDropbox } from "../../../context/DropboxContext";
import { uploadFileDropbox } from "@/services/dropboxServices";
import { Button } from "@/components/ui/Button";

interface IProp {
  hc: string;
  setState: React.Dispatch<React.SetStateAction<IArrayTableHistorial[]>>;
  infoProfessional: {
    adoctor: string;
    ndoctor: string;
    iddoctor: string;
  };
  handle?: () => void;
  focusState?: boolean;
  folder: string;
  setStateModal: (arg: boolean) => void;
}
export const FormUploadHistory: React.FC<IProp> = ({
  setState,
  infoProfessional,
  handle,
  focusState,
  folder,
  setStateModal,
}) => {
  // ----------------------------------------------
  // ------T O K E N  D E  D R O P B O X-----------
  // ----------------------------------------------
  const { token } = useContextDropbox();
  const [loader, setLoader] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState({
    motivo: "",
    descripcion: "",
    archivo: "",
    medicamentos: "",
  });
  // const [image, setImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  // const [fileSaved, setFileSaved] = useState<File | null>(null);

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

  // ------------------------------
  // handle para guardar el archivo
  // ------------------------------
  const handleOnClickSave = async () => {
    if (!file) {
      setLoader(true);
      setTimeout(() => {
        setState((prev: IArrayTableHistorial[]) => [
          ...prev,
          {
            id: Date.now(),
            fecha: new Date().toISOString(),
            motivo: dataForm.motivo,
            data: {
              description: dataForm.descripcion,
              archivo: "",
              medicamentos: dataForm.medicamentos,
            },
            profesional:
              infoProfessional.adoctor + " " + infoProfessional.ndoctor,
          },
        ]);
        setStateModal(false);
        Swal.fire({
          icon: "success",
          title: "Información guardada con éxito",
          confirmButtonColor: "#518915",
        });
        // vaciar el estado del formulario
        setDataForm({
          motivo: "",
          descripcion: "",
          archivo: "",
          medicamentos: "",
        });

        setLoader(false);
      }, 2000);
      return;
    }
    setLoader(true);
    const newFile = renameFile({
      archivoOriginal: file,
      idDoctor: infoProfessional.iddoctor,
    });

    // setFileSaved(newFile);

    try {
      await mutateAsync({
        fileNameError: file.name,
        file: newFile!,
        token: token,
        folder: folder,
      });
      setLoader(false);
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
      setStateModal(false);
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

  return (
    <div className="flex flex-col items-start justify-center w-full gap-2 p-3 bg-white rounded">
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
        <div className="flex justify-end w-full gap-2">
          <Button
            type="button"
            label="cancelar"
            handle={() => setStateModal(false)}
            classButton="bg-blue rounded text-white font-medium  px-5 py-1 hover:bg-blueHover"
          />
          <Button
            type="button"
            label="guardar datos"
            handle={handleOnClickSave}
            loader={loader}
          />
        </div>
      </form>
    </div>
  );
};
