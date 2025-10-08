import { useEffect, useRef, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";
import { FlexibleInputField } from "@/frontend-resourses/components";
import { Button } from "@/views/_components/Button";
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
    if (estado !== "C") return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCancel();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [estado, handleCancel]);

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

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-center w-full h-20 gap-10">
        <div className=" w-2/3  flex flex-col items-start justify-center gap-2 ">
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
            <Button
              icon={<IoSearchSharp />}
              padding="2"
              custom
              classButton={`text-white bg-primaryBlue h-7  border-none hover:bg-blueHover ${
                estado !== "I" && "!bg-gray-300 !text-gray-400 text cursor-not-allowed"
              }`}
              disabledButton={estado !== "I"}
              handle={handleOpenModalSearch}
            />
            <Button
              label="Procesar"
              height=" !h-7"
              disabledButton={estado !== "I" || !(dniInput ?? "").trim()}
              handle={handleOnClickHC}
            />
            <Button
              icon={<IoClose />}
              classButton="text-red-600 h-7 bg-gray-200 border-none hover:bg-gray-300"
              padding="2"
              custom
              disabledButton={estado !== "C"}
              handle={handleCancel}
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
        <div className=" w-1/3  h-full justify-end px-4 items-center flex gap-2 flex-wrap">
          {buttonsHedear.map((item, index) => (
            <Button
              key={index}
              label={item.label}
              classButton={item.classButton}
              disabledButton={item.disabledButton}
              handle={item.handle}
              customRed={item.customRed}
              icon={item.icon}
            />
          ))}
        </div>
      </div>

      <div className="w-full border border-gray-300" />
    </div>
  );
}
