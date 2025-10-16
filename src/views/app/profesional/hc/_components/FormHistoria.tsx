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
import { useMedicalHistoryContext } from "../../../../../context/MedicalHistoryContext";
import InputProfesionales from "@/views/app/_components/features/InputProfesionales";
import SelectorDeArchivos from "@/views/app/_components/features/SelectorDeArchivos";
import { renombrarArchivo } from "../utils/renombrarArchivo";
import { getTodayDate } from "@/views/auth/utils/authUtils";
import { getLocalStorageParams } from "@/utils/index";
import { ActionButton } from "@/frontend-resourses/components";

interface FormHistoriaProps {
  hc: string;
  // infoProfessional: {
  //   adoctor: string;
  //   ndoctor: string;
  //   iddoctor: string;
  // };
  // handle?: () => void;

  setStateModal: (arg: boolean) => void;
  hcSelected?: any;
}

export default function FormHistoria({
  // infoProfessional,
  // handle,

  setStateModal,
  hcSelected,
}: FormHistoriaProps) {
  const { dniHistory, idpaciente, setRefetchHC, setHasNewRegistroChanges, editMode, setEditMode } =
    useMedicalHistoryContext();

  const { iddoctor } = getLocalStorageParams();

  const [loader, setLoader] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState({
    detalle: "",
    obs: "",
    archivo: "",
    medicamentos: "",
  });
  const [originalForm, setOriginalForm] = useState({
    detalle: "",
    obs: "",
    archivo: "",
    medicamentos: "",
  });
  const [fileForm, setFileForm] = useState<File | null>(null);
  const inputMotivoRef = useRef<HTMLInputElement>(null);

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

  const habilitaGrabar = useMemo(() => {
    // Siempre debe haber motivo
    if (!dataForm.detalle.trim()) return false;

    // Alta: motivo y (obs o archivo)
    if (!editMode) {
      return (!!dataForm.obs.trim() || !!fileForm) && hasChanges;
    }

    // Edición: motivo y (obs o archivo o idopera original)
    const tieneObs = !!dataForm.obs.trim();
    const tieneArchivo = !!fileForm;
    const tieneIdOpera = !!hcSelected?.idopera;

    // Si no hay motivo, nunca deja grabar
    // Si hay motivo y (obs o archivo o idopera original), y hay cambios, deja grabar
    return (tieneObs || tieneArchivo || tieneIdOpera) && hasChanges;
  }, [dataForm, fileForm, hasChanges, editMode, hcSelected]);

  const grabarHistoriaService = useMutation({
    mutationFn: grabarHistoria,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      setRefetchHC(true);
    },
  });

  const subirArchivoDropbox = useMutation({ mutationFn: grabarArchivoDropbox });

  useEffect(() => {
    if (inputMotivoRef.current) {
      inputMotivoRef.current.focus();
    }
  }, []);

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
        newFile = renombrarArchivo({
          archivoOriginal: fileForm,
          iddoctor: iddoctor,
          dni: dniHistory,
        });

        await subirArchivoDropbox.mutateAsync({
          fileOriginalName: fileForm.name,
          file: newFile!.file!,
        });
      }

      await grabarHistoriaService.mutateAsync({
        idpaciente: Number(idpaciente),
        iddoctor: iddoctor,
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

      setRefetchHC(true);
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
  //region return
  return (
    <div className="flex flex-col items-start justify-center w-[700px] gap-2 p-3 bg-white border border-gray-300 rounded">
      {/* TITULO */}
      <div className="flex justify-center w-full mb-5">
        <h1 className="text-2xl font-bold text-center text-primaryGreen uppercase">
          {editMode ? "Editar Historia " : "Alta Historia"}
        </h1>
      </div>

      {/* FORMULARIO */}
      <form
        className="flex flex-col w-full gap-2"
        action=""
        onSubmit={(e) => e.preventDefault()}
        // onClick={() => {
        //   handle && handle();
        // }}
      >
        <InputProfesionales
          valueInput={dataForm.detalle}
          nameInput="detalle"
          handleInput={handleOnChangeInput}
          labelInput={"Motivo de Consulta"}
          field={true}
          focusName={"detalle"}
          inputRef={inputMotivoRef}
        />
        <InputProfesionales
          valueInput={dataForm.obs}
          nameInput="obs"
          handleTextarea={handleOnChangeTextarea}
          labelInput={"Evolución"}
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
        <div className="flex justify-end items-center w-full gap-2">
          <ActionButton
            text="Grabar"
            onClick={handleOnClickSave}
            loader={loader}
            disabled={!habilitaGrabar}
            color="green-mtm"
            addClassName="w-24 h-8 !rounded"
          />
          <ActionButton
            text="Salir"
            onClick={handleCloseModal}
            loader={loader}
            disabled={!habilitaGrabar}
            color="red"
            addClassName="w-24 h-8 !rounded"
          />
        </div>
      </form>
    </div>
  );
}
