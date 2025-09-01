import { useState } from "react";
import { InputProfessional } from "./InputProfessional";
import { UploadStudy } from "@/views/dashboardProfessional/UploadStudy";
import { renameFile } from "@/utils/renameFile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import React from "react";
import {
  grabarPacienteDocum,
  postSaveHistory,
  uploadFileDropbox,
} from "@/services/MedicalHistoryService";
import { Button } from "@/components/ui/Button";
import { useMedicalHistoryContext } from "../../../context/MedicalHistoryContext";
import { getTodayDate } from "@/utils/index";
import { useContextDropbox } from "../../../context/DropboxContext";
import { isAxiosError } from "axios";

interface IProp {
  hc: string;
  infoProfessional: {
    adoctor: string;
    ndoctor: string;
    iddoctor: string;
  };
  handle?: () => void;
  focusState?: boolean;
  setStateModal: (arg: boolean) => void;
}

export const FormUploadHistory: React.FC<IProp> = ({
  infoProfessional,
  handle,
  focusState,
  setStateModal,
}) => {
  const queryClient = useQueryClient();
  const { dniHistory } = useMedicalHistoryContext();
  const { folder } = useContextDropbox();
  const [loader, setLoader] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState({
    detalle: "",
    obs: "",
    archivo: "",
    medicamentos: "",
  });
  const [file, setFile] = useState<File | null>(null);
  // const [dataFileSaved, setDataFileSaved] = useState();
  // const [image, setImage] = useState<string>("");
  // const [fileSaved, setFileSaved] = useState<File | null>(null);
  // const [dataToSendDropbox, setDataToSendDropbox] = useState();

  //region mutates
  const saveHistory = useMutation({ mutationFn: postSaveHistory });
  const uploadToDropbox = useMutation({ mutationFn: uploadFileDropbox });
  const linkPatientDoc = useMutation({ mutationFn: grabarPacienteDocum });

  //region function
  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  }

  function handleOnChangeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  }

  async function handleOnClickSave() {
    setLoader(true);
    try {
      const res = await saveHistory.mutateAsync({
        _e: 20,
        dni: Number(dniHistory),
        fecha: getTodayDate(),
        detalle: dataForm.detalle,
        obs: dataForm.obs,
        iddoctor: infoProfessional.iddoctor,
      });

      const idhistoria: number | undefined = res?.data?.data?.grabar_historia;
      if (!idhistoria) throw new Error("No se obtuvo el id de la historia.");

      if (file) {
        const newFile = renameFile({ archivoOriginal: file, dni: dniHistory });

        await uploadToDropbox.mutateAsync({
          fileNameError: file.name,
          file: newFile!,
          folder,
        });

        const extension = (newFile!.name.split(".").pop() ?? "").toLowerCase();
        const fileName = newFile!.name.split(".")[0];
        await linkPatientDoc.mutateAsync({
          empresa: 20,
          idhistoria,
          iddoctor: Number(infoProfessional.iddoctor),
          idopera: fileName, //cambiar al nombre formateado
          extension: extension,
        });
      }

      await queryClient.invalidateQueries({
        queryKey: ["medicalHistory", dniHistory],
      });

      Swal.fire({
        icon: "success",
        title: "Información guardada con éxito",
        confirmButtonColor: "#518915",
      });

      setDataForm({ detalle: "", obs: "", archivo: "", medicamentos: "" });
      setFile(null);
      setStateModal(false);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("Hubo un error...");
      }
    } finally {
      setLoader(false);
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
