import React, { useState } from "react";
import { InputProfessional } from "./InputProfessional";
import { UploadStudy } from "@/views/dashboardProfessional/UploadStudy";
import { renameFile } from "@/utils/renameFile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  postSaveHistory,
  uploadFileDropbox,
} from "@/services/MedicalHistoryService";
import { Button } from "@/components/ui/Button";
import { useMedicalHistoryContext } from "../../../context/MedicalHistoryContext";
import { getTodayDate } from "@/utils/index";

interface IProp {
  hc: string;
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
  infoProfessional,
  handle,
  focusState,
  folder,
  setStateModal,
}) => {
  const queryClient = useQueryClient();
  const { dniHistory } = useMedicalHistoryContext();
  // ----------------------------------------------
  // ------T O K E N  D E  D R O P B O X-----------
  // ----------------------------------------------
  const [loader, setLoader] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState({
    detalle: "",
    obs: "",
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

  //region mutates
  const { mutate: saveMedicalHistory } = useMutation({
    mutationFn: postSaveHistory,
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    },
    onSuccess: (data) => {
      console.log("grabar historia", data);
      queryClient.invalidateQueries({
        queryKey: ["medicalHistory", dniHistory],
      });
      setStateModal(false);
      Swal.fire({
        icon: "success",
        title: "Información Guardada con Éxito",
        confirmButtonColor: "#518915",
      });
    },
  });

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
          title: "Información Guardada con Éxito",
          confirmButtonColor: "#518915",
        });
      }
    },
  });

  // ------------------------------
  // handle para guardar el archivo
  // ------------------------------
  async function handleOnClickSave() {
    if (!file) {
      setLoader(true);
      setTimeout(() => {
        setStateModal(false);
        saveMedicalHistory({
          _e: 20,
          dni: Number(dniHistory),
          fecha: getTodayDate(),
          detalle: dataForm.detalle,
          obs: dataForm.obs,
          iddoctor: infoProfessional.iddoctor,
        });
        Swal.fire({
          icon: "success",
          title: "Información Guardada con Éxito",
          confirmButtonColor: "#518915",
        });

        setDataForm({
          detalle: "",
          obs: "",
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
      dni: dniHistory,
    });

    // setFileSaved(newFile);

    try {
      await mutateAsync({
        fileNameError: file.name,
        file: newFile!,
        folder: folder,
      });
      setLoader(false);
      setDataForm({
        detalle: "",
        obs: "",
        archivo: "",
        medicamentos: "",
      });
      setFile(null);
      setStateModal(false);
    } catch (error) {
      console.error("Error al subir archivo:", error);
      Swal.fire({
        icon: "error",
        title: "Error al subir el archivo",
        text: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  return (
    <div className="flex flex-col items-start justify-center w-full gap-2 p-3 bg-white rounded">
      <div className="flex justify-center w-full">
        <h1 className="text-xl font-bold text-center text-blue">
          Agregar Datos de la Consulta
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
          valueInput={dataForm.detalle}
          nameInput="detalle"
          handleInput={handleOnChangeInput}
          placeholderInput={"control"}
          labelInput={"motivo de consulta"}
          field={true}
          focusState={focusState}
          focusName={"detalle"}
        />
        <InputProfessional
          valueInput={dataForm.obs}
          nameInput="obs"
          handleTextarea={handleOnChangeTextarea}
          placeholderInput={"Peso: 57kg talla: 1.70m"}
          labelInput={"descripción"}
          focusState={focusState}
          focusName={"obs"}
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
            classButton="bg-red-500 rounded text-white font-medium  px-5 py-1 hover:bg-red-600"
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
