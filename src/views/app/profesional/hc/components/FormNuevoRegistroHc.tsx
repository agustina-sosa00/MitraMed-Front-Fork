import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import React from "react";
import {
  grabarHistoria,
  grabarPacienteDocum,
  uploadFileDropbox,
} from "@/views/app/profesional/hc/service/HistorialClinicoService";
import { Button } from "@/views/components/Button";
import { useMedicalHistoryContext } from "../../../../../context/MedicalHistoryContext";
import InputProfesionales from "@/views/app/components/features/InputProfesionales";
import SelectorDeArchivos from "@/views/app/components/features/SelectorDeArchivos";
import { renombrarArchivo } from "../utils/renombrarArchivo";
import { getTodayDate } from "@/views/auth/utils/authUtils";

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

export default function FormNuevoRegistroHc({
  infoProfessional,
  handle,
  focusState,
  setStateModal,
}: IProp) {
  const queryClient = useQueryClient();
  const { dniHistory } = useMedicalHistoryContext();
  const [loader, setLoader] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState({
    detalle: "",
    obs: "",
    archivo: "",
    medicamentos: "",
  });
  const [fileForm, setFileForm] = useState<File | null>(null);
  // const [dataFileSaved, setDataFileSaved] = useState();
  // const [image, setImage] = useState<string>("");
  // const [fileSaved, setFileSaved] = useState<File | null>(null);
  // const [dataToSendDropbox, setDataToSendDropbox] = useState();

  //region mutates
  const saveHistory = useMutation({ mutationFn: grabarHistoria });
  const uploadToDropbox = useMutation({ mutationFn: uploadFileDropbox });
  const savePatientDocum = useMutation({ mutationFn: grabarPacienteDocum });

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
      let newFile: { file: File; name: string; extension: string } | null = null;

      if (fileForm) {
        newFile = renombrarArchivo({ archivoOriginal: fileForm, dni: dniHistory });
        await uploadToDropbox.mutateAsync({
          fileOriginalName: fileForm.name,
          file: newFile!.file!,
        });
      }

      const res = await saveHistory.mutateAsync({
        dni: Number(dniHistory),
        fecha: getTodayDate(),
        detalle: dataForm.detalle,
        obs: dataForm.obs,
        iddoctor: infoProfessional.iddoctor,
      });

      if (newFile) {
        const idhistoria: number | undefined = res?.data?.data?.grabar_historia;
        if (!idhistoria) throw new Error("No se obtuvo el id de la historia.");

        await savePatientDocum.mutateAsync({
          idhistoria,
          iddoctor: Number(infoProfessional.iddoctor),
          idopera: newFile!.name,
          extension: newFile!.extension,
        });
        setFileForm(null);
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
      setStateModal(false);
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      setLoader(false);
    }
  }

  return (
    <div className="flex flex-col items-start justify-center w-full gap-2 p-3 bg-white border border-gray-300 rounded">
      <div className="flex justify-center w-full">
        <h1 className="text-xl font-bold text-center text-blue">Agregar Datos de la Consulta</h1>
      </div>
      <form
        className="flex flex-col w-full gap-2"
        action=""
        onClick={() => {
          handle!();
        }}
      >
        <InputProfesionales
          valueInput={dataForm.detalle}
          nameInput="detalle"
          handleInput={handleOnChangeInput}
          labelInput={"motivo de consulta"}
          field={true}
          focusState={focusState}
          focusName={"detalle"}
        />
        <InputProfesionales
          valueInput={dataForm.obs}
          nameInput="obs"
          handleTextarea={handleOnChangeTextarea}
          labelInput={"observaciones"}
          focusState={focusState}
          focusName={"obs"}
        />
        <div className="flex w-full">
          <div className=" w-36">
            <label htmlFor="" className="mr-2 text-sm font-medium capitalize text-blue">
              Subir archivo:
            </label>
          </div>
          <SelectorDeArchivos setState={setFileForm} state={fileForm!} />
        </div>
        <div className="flex justify-end w-full gap-2">
          <Button
            type="button"
            label="cancelar"
            handle={() => setStateModal(false)}
            classButton="bg-red-500 rounded text-white font-medium  px-5 py-1 hover:bg-red-600"
          />
          <Button type="button" label="guardar datos" handle={handleOnClickSave} loader={loader} />
        </div>
      </form>
    </div>
  );
}
