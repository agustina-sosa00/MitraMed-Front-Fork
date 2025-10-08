import { FlexibleInputField } from "@/frontend-resourses/components";
import { Button } from "@/views/_components/Button";
import { IoSearchSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { consultaPacientes } from "../service/PacientesService";
import { useEffect, useRef, useState } from "react";
import { usePacientesStore } from "../store/pacientesStore";

export default function ModalHeader({ handleCloseModal }) {
  const estado = usePacientesStore((s) => s.estado);
  const setEstado = usePacientesStore((s) => s.setEstado);
  const setDataPacientesModal = usePacientesStore((s) => s.setDataPacientesModal);
  const setSelectTable = usePacientesStore((s) => s.setSelectTable);
  const dataPaciente = usePacientesStore((s) => s.dataPaciente);
  const errorMessage = usePacientesStore((s) => s.errorMessage);
  const setErrorMessage = usePacientesStore((s) => s.setErrorMessage);
  const clearErrorMessage = usePacientesStore((s) => s.clearErrorMessage);

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

  const autofocusHC = estado === "I";
  const inputRefHc = useRef<Array<HTMLInputElement | null>>([]);
  const searchBtnRef = useRef<HTMLButtonElement | null>(null);

  const buscarDisabled =
    dataInputs.apellido === "" &&
    dataInputs.dni === "" &&
    dataInputs.loc === "" &&
    dataInputs.dom1 === "" &&
    dataInputs.nombre === "";

  const inputs = [
    {
      key: "apellido",
      label: "Apellido",
      labelWidth: "60px",
      inputWidth: "w-full",
      containerClassName: "!w-60 ",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      inputRef: inputRefHc,
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
      labelWidth: "60px",
      containerClassName: "!w-60 ",
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
      containerClassName: "!w-[500px]",
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
    },
  ];

  const { mutate: postConsultaPacientes } = useMutation({
    mutationFn: consultaPacientes,
    onError(error) {
      throw new Error(`${error}`);
    },
    onSuccess(data) {
      if (data.data.length === 0) {
        setErrorMessage("modal", "Sin registros");
        inputRefHc.current[0]?.focus();
      }

      setDataPacientesModal(data.data);
      setSelectTable(true);
    },
  });

  useEffect(() => {
    if (autofocusHC) inputRefHc.current[0]?.focus();
  }, [estado, autofocusHC]);

  function handleOnChange(field, value) {
    if (value.length === 0) {
      clearErrorMessage("modal");
    }
    setDataInputs({ ...dataInputs, [field]: value });
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

  function handleInputKeyDown(index: number) {
    return (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;
      e.preventDefault();

      // siguiente input
      for (let i = index + 1; i < inputRefHc.current.length; i++) {
        const el = inputRefHc.current[i];
        if (el && !el.disabled) {
          el.focus();
          return;
        }
      }

      // último: foco al botón si está habilitado
      const btn = searchBtnRef.current;
      if (btn && !btn.disabled) btn.focus();
    };
  }

  function handleSelectPaciente() {
    setEstado("C");
    handleCloseModal();
  }

  //region return
  return (
    <div className="w- h-32 flex">
      <div className="w-full flex flex-wrap  gap-x-5 flex-row ">
        {inputs.map((item, index) => (
          <FlexibleInputField
            key={item.key}
            label={item.label}
            name={item.key}
            value={dataInputs[item.key]}
            onChange={(value) => handleOnChange(item.key, value)}
            onKeyDown={handleInputKeyDown(index)}
            inputRef={(el: HTMLInputElement | null) => {
              inputRefHc.current[index] = el;
            }}
            inputWidth={item.inputWidth}
            inputClassName={item.inputClassName}
            labelWidth={item.labelWidth}
            containerClassName={item.containerClassName}
          />
        ))}
        <div className="w-full h-6 text-red-500 font-semibold">
          {errorMessage?.place === "modal" && errorMessage?.message}
        </div>
      </div>
      <div className="  justify-center items-center flex flex-col gap-1 ">
        <Button
          label="Buscar"
          custom={true}
          classButton="h-7 w-full flex justify-center text-primaryGreen "
          icon={<IoSearchSharp />}
          disabledButton={buscarDisabled}
          handle={() => handleClickSearch()}
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
