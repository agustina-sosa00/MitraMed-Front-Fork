import { FlexibleInputField } from "@/frontend-resourses/components";
import { Button } from "@/views/_components/Button";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { consultaPacientes } from "../service/PacientesService";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePacientesStore } from "../store/pacientesStore";

type Props = { handleCloseModal: () => void };

export default function ModalHeader({ handleCloseModal }: Props) {
  const estado = usePacientesStore((s) => s.estado);
  const setEstado = usePacientesStore((s) => s.setEstado);
  const dataPacientesModal = usePacientesStore((s) => s.dataPacientesModal);

  const setDataPacientesModal = usePacientesStore((s) => s.setDataPacientesModal);
  const setSelectTable = usePacientesStore((s) => s.setSelectTable);
  const dataPaciente = usePacientesStore((s) => s.dataPaciente);
  const errorMessage = usePacientesStore((s) => s.errorMessage);
  const setErrorMessage = usePacientesStore((s) => s.setErrorMessage);
  const clearErrorMessage = usePacientesStore((s) => s.clearErrorMessage);
  const reset = usePacientesStore((s) => s.reset);

  const hasSelection = !!dataPaciente;

  const [dataInputs, setDataInputs] = useState({
    apellido: "",
    nombre: "",
    dni: "",
    cuil: "",
    dom1: "",
    dom2: "",
    loc: "",
  });

  const inputRefsByKey = useRef<Record<string, HTMLInputElement | null>>({});
  const searchBtnRef = useRef<HTMLButtonElement | null>(null);
  const focusOrder = ["apellido", "nombre", "dni", "loc", "dom1"] as const;

  const handleCancel = useCallback(() => {
    setDataInputs({
      apellido: "",
      nombre: "",
      dni: "",
      cuil: "",
      dom1: "",
      dom2: "",
      loc: "",
    });
    reset();
    requestAnimationFrame(() => {
      focusByKey("apellido");
    });
  }, [reset]);

  const inputs = [
    {
      key: "apellido",
      label: "Apellido",
      labelWidth: "60px",
      containerClassName: "!w-60 ",
      inputWidth: "w-full",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
    },
    {
      key: "nombre",
      label: "Nombre",
      labelWidth: "60px",
      containerClassName: "!w-60 ",
      inputWidth: "w-full",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
    },
    {
      key: "dni",
      label: "DNI",
      labelWidth: "30px",
      containerClassName: "!w-36 ",
      inputWidth: "w-full",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
    },
    {
      key: "loc",
      label: "Localidad",
      labelWidth: "60px",
      containerClassName: "!w-60 ",
      inputWidth: "w-full",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
    },
    {
      key: "dom1",
      label: "Domicilio",
      labelWidth: "60px",
      containerClassName: "!w-[400px]",
      inputWidth: "w-full",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
    },
  ];

  const buttonsModal = [
    {
      label: "Seleccionar",
      className: "h-7 !w-auto",
      icons: <FaCheck />,
      disabledButton: !hasSelection,
      handle: handleSelectPaciente,
    },
    {
      label: "Cancelar",
      customRed: true,
      className: "h-7 w-full flex justify-center ",
      icons: <IoMdClose />,
      disabledButton: !hasSelection,
      handle: handleCancel,
    },
  ];

  const buscarDisabled =
    dataInputs.apellido === "" &&
    dataInputs.dni === "" &&
    dataInputs.loc === "" &&
    dataInputs.dom1 === "" &&
    dataInputs.nombre === "";

  const { mutate: postConsultaPacientes } = useMutation({
    mutationFn: consultaPacientes,
    onError(error) {
      throw new Error(`${error}`);
    },
    onSuccess(data) {
      if (data.data.length === 0) {
        setErrorMessage("modal", "Sin registros");
        focusByKey("apellido");
        return;
      }
      setDataPacientesModal(data.data);
      setSelectTable(true);
    },
  });

  useEffect(() => {
    if (estado === "I") focusByKey("apellido");
  }, [estado]);

  useEffect(
    function onEscClearOrClose() {
      function onKeyDown(e: KeyboardEvent) {
        if (e.key !== "Escape") return;
        const hasInputs =
          !!dataInputs.apellido.trim() ||
          !!dataInputs.nombre.trim() ||
          !!dataInputs.dni.trim() ||
          !!dataInputs.cuil.trim() ||
          !!dataInputs.dom1.trim() ||
          !!dataInputs.dom2.trim() ||
          !!dataInputs.loc.trim();

        const hasResults = Array.isArray(dataPacientesModal)
          ? dataPacientesModal.length > 0
          : !!dataPacientesModal;

        if (hasInputs || hasResults) {
          e.preventDefault();
          handleCancel();
          return;
        }
        e.preventDefault();
        handleCloseModal();
      }
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    },
    [dataInputs, dataPacientesModal, handleCancel, handleCloseModal],
  );

  function focusByKey(key: string) {
    const el = inputRefsByKey.current[key];
    if (el && !el.disabled) {
      el.focus();
      el.select?.();
      return true;
    }
    return false;
  }

  function focusNextFrom(currentKey: string) {
    const idx = focusOrder.indexOf(currentKey as any);
    if (idx >= 0 && idx < focusOrder.length - 1) {
      // siguiente input del orden
      if (focusByKey(focusOrder[idx + 1])) return;
    }
    // último paso: botón Buscar
    if (searchBtnRef.current && !searchBtnRef.current.disabled) {
      searchBtnRef.current.focus();
    }
  }

  function handleOnChange(field: string, value: string) {
    if (value.length === 0) clearErrorMessage("modal");
    setDataInputs((prev) => ({ ...prev, [field]: value }));
  }

  function handleInputKeyDownByKey(key: string) {
    return (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      focusNextFrom(key);
    };
  }

  function handleClickSearch() {
    postConsultaPacientes({
      apellido: dataInputs.apellido,
      nombre: dataInputs.nombre,
      dni: dataInputs.dni,
      cuil: dataInputs.cuil,
      dom1: dataInputs.dom1,
      dom2: dataInputs.dom2,
      loc: dataInputs.loc,
    });
  }

  function handleSelectPaciente() {
    setEstado("C");
    setErrorMessage("modal", "");
    setErrorMessage("header", "");
    handleCloseModal();
  }

  // region return
  return (
    <div className="w-full h-32 flex">
      <div className="w-full flex flex-wrap justify-start items-center gap-x-4 flex-row">
        {inputs.slice(0, 3).map((item) => (
          <FlexibleInputField
            key={item.key}
            label={item.label}
            name={item.key}
            value={dataInputs[item.key]}
            onChange={(value) => handleOnChange(item.key, value)}
            onKeyDown={handleInputKeyDownByKey(item.key)}
            inputRef={(el: HTMLInputElement | null) => {
              inputRefsByKey.current[item.key] = el;
            }}
            inputWidth={item.inputWidth}
            inputClassName={item.inputClassName}
            labelWidth={item.labelWidth}
            containerClassName={item.containerClassName}
          />
        ))}

        <Button
          icon={<IoClose />}
          classButton="text-red-600 h-7 bg-gray-200 border-none hover:bg-gray-300"
          padding="2"
          custom
          disabledButton={
            dataInputs.apellido === "" &&
            dataInputs.dni === "" &&
            dataInputs.loc === "" &&
            dataInputs.dom1 === "" &&
            dataInputs.nombre === ""
          }
          handle={handleCancel}
        />

        {inputs.slice(3).map((item) => (
          <FlexibleInputField
            key={item.key}
            label={item.label}
            name={item.key}
            value={dataInputs[item.key]}
            onChange={(value) => handleOnChange(item.key, value)}
            onKeyDown={handleInputKeyDownByKey(item.key)}
            inputRef={(el: HTMLInputElement | null) => {
              inputRefsByKey.current[item.key] = el;
            }}
            inputWidth={item.inputWidth}
            inputClassName={item.inputClassName}
            labelWidth={item.labelWidth}
            containerClassName={item.containerClassName}
          />
        ))}

        <div className="w-full h-6 text-red-500 flex justify-between font-semibold">
          {errorMessage?.place === "modal" && errorMessage?.message}
        </div>
      </div>

      <div className="justify-center items-center flex flex-col gap-3">
        <Button
          label="Buscar"
          custom
          classButton="h-7 w-full flex justify-center text-primaryGreen"
          icon={<IoSearchSharp />}
          disabledButton={buscarDisabled}
          handle={handleClickSearch}
          buttonRef={searchBtnRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !buscarDisabled) {
              e.preventDefault();
              handleClickSearch();
            }
          }}
        />
        {buttonsModal.map((item, index) => (
          <Button
            key={index}
            label={item.label}
            customRed={item.customRed}
            classButton={item.className}
            icon={item.icons}
            disabledButton={item.disabledButton}
            handle={item.handle}
          />
        ))}
      </div>
    </div>
  );
}
