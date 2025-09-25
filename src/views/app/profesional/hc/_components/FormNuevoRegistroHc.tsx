import { useEffect, useMemo, useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import React from "react";
import {
  grabarArchivoDropbox,
  grabarHistoria,
  // grabarHistoriaDocum,
  // uploadFileDropbox,
} from "@/views/app/profesional/hc/service/HistorialClinicoService";
import { Button } from "@/views/_components/Button";
import { useMedicalHistoryContext } from "../../../../../context/MedicalHistoryContext";
import InputProfesionales from "@/views/app/_components/features/InputProfesionales";
import SelectorDeArchivos from "@/views/app/_components/features/SelectorDeArchivos";
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
  hcSelected?: any;
}

export default function FormNuevoRegistroHc({
  infoProfessional,
  handle,
  focusState,
  setStateModal,
  hcSelected,
}: IProp) {
  // const queryClient = useQueryClient();

  const { dniHistory, idpaciente, setRefetchHC, setHasNewRegistroChanges, editMode, setEditMode } =
    useMedicalHistoryContext();

  const [loader, setLoader] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState({
    detalle: "",
    obs: "",
    archivo: "",
    medicamentos: "",
  });

  // Al inicio del componente:
  const [originalForm, setOriginalForm] = useState({
    detalle: "",
    obs: "",
    archivo: "",
    medicamentos: "",
  });

  // Ref para el primer input
  const inputMotivoRef = useRef<HTMLInputElement>(null);

  // Estado para el archivo seleccionado
  const [fileForm, setFileForm] = useState<File | null>(null);
  // Al montar el form, enfocar el primer input
  useEffect(() => {
    if (inputMotivoRef.current) {
      inputMotivoRef.current.focus();
    }
  }, []);

  const hasChanges = useMemo(() => {
    if (!hcSelected) {
      return (
        !!dataForm.detalle.trim() ||
        !!dataForm.obs.trim() ||
        !!dataForm.archivo.trim() ||
        !!dataForm.medicamentos.trim() ||
        !!fileForm
      );
    }
    // Si es edición, compara con originalForm
    return (
      dataForm.detalle !== originalForm.detalle ||
      dataForm.obs !== originalForm.obs ||
      dataForm.archivo !== originalForm.archivo ||
      dataForm.medicamentos !== originalForm.medicamentos ||
      !!fileForm
    );
  }, [dataForm, fileForm, hcSelected, originalForm]);

  const habilitaGrabar =
    !!dataForm.detalle.trim() && (!!dataForm.obs.trim() || !!fileForm) && hasChanges;

  //region mutates
  const grabarHistoriaService = useMutation({
    mutationFn: grabarHistoria,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data?.data);
      setRefetchHC(true);
    },
  });

  // Avisar al padre si cambia el estado de hasChanges
  useEffect(() => {
    setHasNewRegistroChanges(hasChanges);
  }, [hasChanges]);

  useEffect(() => {
    if (hcSelected) {
      const original = {
        detalle: hcSelected.detalle || "",
        obs: hcSelected.obs || "",
        archivo: "",
        medicamentos: "",
      };
      setDataForm(original);
      setOriginalForm(original);
    } else {
      const empty = { detalle: "", obs: "", archivo: "", medicamentos: "" };
      setDataForm(empty);
      setOriginalForm(empty);
    }
  }, [hcSelected]);

  const subirArchivoDropbox = useMutation({ mutationFn: grabarArchivoDropbox });
  // const grabarHistoriaDocumDropbox = useMutation({ mutationFn: grabarHistoriaDocum });

  //region function
  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  }

  function handleOnChangeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  }

  // console.log(editMode);
  // console.log(hcSelected.idhistoria);
  async function handleOnClickSave() {
    setLoader(true);
    try {
      let newFile: { file: File; name: string; extension: string } | null = null;

      if (fileForm) {
        newFile = renombrarArchivo({
          archivoOriginal: fileForm,
          iddoctor: infoProfessional.iddoctor,
          dni: dniHistory,
        });

        await subirArchivoDropbox.mutateAsync({
          fileOriginalName: fileForm.name,
          file: newFile!.file!,
        });
      }

      await grabarHistoriaService.mutateAsync({
        idpaciente: Number(idpaciente),
        iddoctor: infoProfessional.iddoctor,
        fecha: getTodayDate(),
        detalle: dataForm.detalle,
        obs: dataForm.obs,
        idhistoria: editMode ? hcSelected.idhistoria : null,
        tproceso: editMode ? 2 : 1,
        idopera: newFile ? newFile.name : null,
        extension: newFile ? newFile.extension : null,
      });

      // await queryClient.invalidateQueries({
      //   queryKey: ["medicalHistory", dniHistory],
      // });

      Swal.fire({
        icon: "success",
        text: "Registro Grabado",
        confirmButtonColor: "#518915",
        timer: 1000,
      });

      setDataForm({ detalle: "", obs: "", archivo: "", medicamentos: "" });
      setStateModal(false);
      setEditMode(false);
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      setLoader(false);
    }
  }

  function handleCloseModal() {
    if (!hasChanges) {
      setStateModal(false);
    } else {
      Swal.fire({
        title: "Cambios sin Guardar",
        text: "¿Desea Salir?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        confirmButtonColor: "#518915",
        cancelButtonColor: "#ef4444",
      }).then((result) => {
        if (result.isConfirmed) {
          setStateModal(false);
        }
      });
    }
    setEditMode(false);
  }

  return (
    <div className="flex flex-col items-start justify-center w-[700px] gap-2 p-3 bg-white border border-gray-300 rounded">
      <div className="flex justify-center w-full mb-5">
        <h1 className="text-2xl font-bold text-center text-primaryGreen uppercase">
          {editMode ? "Editar Historia " : "Alta Historia"}
        </h1>
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
          labelInput={"Motivo de Consulta"}
          field={true}
          focusState={focusState}
          focusName={"detalle"}
          inputRef={inputMotivoRef}
        />
        <InputProfesionales
          valueInput={dataForm.obs}
          nameInput="obs"
          handleTextarea={handleOnChangeTextarea}
          labelInput={"Evolución"}
          focusState={focusState}
          focusName={"obs"}
        />

        {/* Selector de Archivos */}
        {(!editMode || (editMode && !hcSelected?.idopera)) && (
          <div className="flex w-full">
            <label
              htmlFor=""
              className="flex justify-end items-start w-36 text-right mr-2 text-sm text-primaryBlue"
            >
              Subir Archivo:
            </label>
            <SelectorDeArchivos setState={setFileForm} state={fileForm!} />
          </div>
        )}

        {/* Botones */}
        <div className="flex justify-end w-full gap-2">
          <Button
            type="button"
            label="Grabar"
            handle={handleOnClickSave}
            loader={loader}
            disabledButton={!habilitaGrabar}
          />
          <Button
            type="button"
            label="salir"
            handle={handleCloseModal}
            classButton="bg-red-500 rounded text-white font-medium  px-5 py-1 hover:bg-red-600"
          />
        </div>
      </form>
    </div>
  );
}
