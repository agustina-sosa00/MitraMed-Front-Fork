import { useEffect, useRef, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";
import { ActionButton, FlexibleInputField } from "@/frontend-resourses/components";
import { usePacientesStore } from "../store/pacientesStore";
import { obtenerPaciente } from "../service/PacientesService";
import { IoSearchSharp } from "react-icons/io5";
import { BsDatabaseFill } from "react-icons/bs";
import { BsDatabaseFillX } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import { LuPencilOff } from "react-icons/lu";

export default function HeaderCard({ handleOpenModalSearch }) {
  const estado = usePacientesStore((s) => s.estado);
  const setEstado = usePacientesStore((s) => s.setEstado);
  const dniInput = usePacientesStore((s) => s.dniInput);
  const setDniInput = usePacientesStore((s) => s.setDniInput);
  const dataPaciente = usePacientesStore((s) => s.dataPaciente);
  const setDataPaciente = usePacientesStore((s) => s.setDataPaciente);
  const startEdit = usePacientesStore((s) => s.startEdit);
  const cancelEditToBackup = usePacientesStore((s) => s.cancelEditToBackup);
  const reset = usePacientesStore((s) => s.reset);
  const errorMessage = usePacientesStore((s) => s.errorMessage);
  const setErrorMessage = usePacientesStore((s) => s.setErrorMessage);
  const clearErrorMessage = usePacientesStore((s) => s.clearErrorMessage);

  // const autofocusHC = estado === "I";
  const inputRefHc = useRef<HTMLInputElement>(null);

  const buttonsHedear = [
    {
      label: "Editar",
      classButton: "h-7",
      disabledButton: estado !== "C",
      handle: () => startEdit(),
      icon: <LuPencil />,
    },
    {
      label: "Cancelar",
      customRed: true,
      classButton: "h-7",
      disabledButton: estado !== "M",
      handle: () => cancelEditToBackup(),
      icon: <LuPencilOff />,
    },
    {
      label: "Guardar",
      classButton: "h-7",
      disabledButton: estado !== "M",
      handle: () => cancelEditToBackup(),
      icon: <BsDatabaseFill />,
    },
    {
      label: "Borrar",
      classButton: "h-7",
      disabledButton: true,
      customRed: true,
      icon: <BsDatabaseFillX />,
    },
  ];

  const { mutate: getPacienteMutate } = useMutation({
    mutationFn: obtenerPaciente,
    onError(error) {
      throw new Error(`${error}`);
    },
    onSuccess(data) {
      console.log(data);
      if (!data.data) {
        setErrorMessage("header", "Paciente inexistente");
        inputRefHc.current?.focus();
        return;
      }
      setEstado("C");
      setDataPaciente(data.data);
    },
  });

  const handleOnClickHC = useCallback(() => {
    clearErrorMessage("header");
    const dni = (dniInput ?? "").trim();
    if (estado !== "I" || !dni) return;
    getPacienteMutate({ dni });
  }, [dniInput, estado, getPacienteMutate]);

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    inputRefHc.current?.focus();
  }, [estado]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;

      if (estado === "M") {
        e.preventDefault();
        cancelEditToBackup();
        return;
      }

      if (estado === "C") {
        e.preventDefault();
        handleCancel();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [estado, cancelEditToBackup, handleCancel]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (estado !== "I") return;

    if (e.key === "Enter") {
      e.preventDefault();
      if ((dniInput ?? "").trim()) handleOnClickHC();
    }

    if (e.key === "Escape") {
      if (dniInput) setDniInput("");
    }
  }

  function handleOnChange(e) {
    if (e.length === 0) {
      clearErrorMessage("header");
    }
    setDniInput(e);
  }
  //region return
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-center w-full h-28 gap-10">
        <div className=" w-2/3  flex flex-col items-start justify-center gap-5 ">
          {" "}
          <div className="flex items-center justify-start w-full gap-2">
            <FlexibleInputField
              label="HC"
              value={dataPaciente?.dni ? dataPaciente.dni : dniInput}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              inputRef={inputRefHc}
              inputWidth="w-32"
              labelWidth="60px"
              inputClassName="rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen"
              containerWidth="w-42"
              disabled={estado !== "I"}
              maxLength={8}
            />
            <ActionButton
              icon={<IoSearchSharp />}
              color="blue-mtm"
              addClassName={`h-7 p-2  !rounded`}
              disabled={estado !== "I"}
              onClick={handleOpenModalSearch}
            />
            <ActionButton
              text="Procesar"
              addClassName={`h-7 px-4 !rounded`}
              disabled={estado !== "I" || !(dniInput ?? "").trim()}
              onClick={handleOnClickHC}
            />
            <ActionButton
              icon={<IoClose />}
              disabled={estado !== "C"}
              onClick={handleCancel}
              addClassName="h-7 p-2 !rounded"
              color="customGray"
              customColorText="red-600"
            />

            <p className="font-semibold text-red-500">
              {errorMessage?.place === "header" && errorMessage?.message}
            </p>
          </div>
          <div className="flex items-center justify-start gap-3">
            <FlexibleInputField
              label="Apellido"
              key="apellido"
              value={dataPaciente?.apellido ?? ""}
              inputWidth="w-50"
              labelWidth="60px"
              labelAlign="left"
              containerWidth="w-42"
              inputClassName="rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen"
              disabled
            />
            <FlexibleInputField
              label="Nombre"
              key="nombre"
              value={dataPaciente?.nombre ?? ""}
              inputWidth="w-60"
              labelWidth="60px"
              labelAlign="left"
              containerWidth="w-42"
              inputClassName="rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen"
              disabled
            />
          </div>
        </div>{" "}
        <div className=" w-1/3  gap-y-5 gap-x-2 justify-end px-4 items-center flex flex-wrap">
          {buttonsHedear.map((item, index) => (
            <ActionButton
              key={index}
              text={item.label}
              color={item.customRed ? "red" : "green-mtm"}
              onClick={item.handle}
              disabled={item.disabledButton}
              icon={item.icon}
              addClassName={`${item.classButton} w-32 flex justify-center !rounded`}
            />
          ))}
        </div>
      </div>

      <div className="w-full border border-gray-300" />
    </div>
  );
}
