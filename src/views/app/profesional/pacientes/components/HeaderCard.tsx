import { useEffect, useRef, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";
import { FlexibleInputField } from "@/frontend-resourses/components";
import { Button } from "@/views/_components/Button";
import { usePacientesStore } from "../store/pacientesStore";
import { obtenerPaciente } from "../service/PacientesService";
import { IoSearchSharp } from "react-icons/io5";

export default function HeaderCard({ handleOpenModalSearch }) {
  const estado = usePacientesStore((s) => s.estado);
  const setEstado = usePacientesStore((s) => s.setEstado);
  const dniInput = usePacientesStore((s) => s.dniInput);
  const setDniInput = usePacientesStore((s) => s.setDniInput);
  const dataPaciente = usePacientesStore((s) => s.dataPaciente);
  const setDataPaciente = usePacientesStore((s) => s.setDataPaciente);
  const startEdit = usePacientesStore((s) => s.startEdit);
  const cancelEditToBackup = usePacientesStore((s) => s.cancelEditToBackup);

  const autofocusHC = estado === "i";
  const inputRefHc = useRef<HTMLInputElement>(null);

  const buttonsHedear = [
    {
      label: "Editar",
      classButton: "h-7",
      disabledButton: estado !== "c",
      handle: () => startEdit(),
    },
    {
      label: "Cancelar Edicion",
      customRed: true,
      classButton: "h-7",
      disabledButton: estado !== "m",
      handle: () => cancelEditToBackup(),
    },
    {
      label: "Guardar en BD",
      classButton: "h-7",
      disabledButton: estado !== "m",
    },
    {
      label: "Borrar de BD",
      classButton: "h-7",
      disabledButton: true,
      customRed: true,
    },
  ];

  const { mutate: getPacienteMutate } = useMutation({
    mutationFn: obtenerPaciente,
    onError(error) {
      throw new Error(`${error}`);
    },
    onSuccess(data) {
      setEstado("c");
      setDataPaciente(data.data);
    },
  });

  const handleOnClickHC = useCallback(() => {
    const dni = (dniInput ?? "").trim();
    if (estado !== "i" || !dni) return;
    getPacienteMutate({ dni });
  }, [dniInput, estado, getPacienteMutate]);

  const handleCancel = useCallback(() => {
    setDniInput("");
    setDataPaciente(null);
    setEstado("i");
  }, [setDniInput, setDataPaciente, setEstado]);

  useEffect(() => {
    if (autofocusHC) inputRefHc.current?.focus();
  }, [estado, autofocusHC]);

  useEffect(() => {
    if (estado !== "c") return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCancel();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [estado, handleCancel]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (estado !== "i") return;

    if (e.key === "Enter") {
      e.preventDefault();
      if ((dniInput ?? "").trim()) handleOnClickHC();
    }

    if (e.key === "Escape") {
      if (dniInput) setDniInput("");
    }
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-end justify-start w-full h-10 gap-10">
        <div className="flex items-end justify-start h-16 gap-2">
          <FlexibleInputField
            label="HC"
            value={dniInput}
            onChange={(e) => setDniInput(e)}
            onKeyDown={handleKeyDown}
            inputRef={inputRefHc}
            inputWidth="w-32"
            labelWidth="60px"
            inputClassName="rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen"
            containerWidth="w-42"
            disabled={estado !== "i"}
            maxLength={8}
          />
          <Button
            icon={<IoSearchSharp />}
            padding="2"
            custom
            classButton="text-primaryGreen h-7  border-none hover:bg-gray-300"
            disabledButton={estado !== "i"}
            handle={handleOpenModalSearch}
          />
          <Button
            label="Procesar"
            height=" !h-7"
            disabledButton={estado !== "i" || !(dniInput ?? "").trim()}
            handle={handleOnClickHC}
          />
          <Button
            icon={<IoClose />}
            classButton="text-red-600 h-7 bg-gray-200 border-none hover:bg-gray-300"
            padding="2"
            custom
            disabledButton={estado !== "c"}
            handle={handleCancel}
          />
        </div>

        <div className="flex-[1] h-7 flex gap-2 justify-end">
          {buttonsHedear.map((item, index) => (
            <Button
              key={index}
              label={item.label}
              classButton={item.classButton}
              disabledButton={item.disabledButton}
              handle={item.handle}
              customRed={item.customRed}
            />
          ))}
        </div>
      </div>

      <div className="flex items-end justify-start gap-3">
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

      <div className="w-full border border-gray-300" />
    </div>
  );
}
