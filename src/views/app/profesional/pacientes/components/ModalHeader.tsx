import { FlexibleInputField } from "@/frontend-resourses/components";
import { Button } from "@/views/_components/Button";
import { IoSearchSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export default function ModalHeader() {
  const inputs = [
    {
      key: "apellido",
      label: "Apellido",
      labelWidth: "60px",
      inputWidth: "w-full",
      containerClassName: "!w-60 ",
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
      labelWidth: "60px",
      containerClassName: "!w-60 ",
      inputWidth: "w-full",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
    },
    {
      key: "localidad",
      label: "Localidad",
      labelWidth: "60px",
      containerClassName: "!w-60 ",
      inputWidth: "w-full",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
    },
    {
      key: "domicilio",
      label: "Domicilio",
      labelWidth: "60px",
      containerClassName: "!w-[500px]",
      inputWidth: "w-full",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
    },
  ];

  const buttonsModal = [
    {
      label: "Buscar",
      custom: true,
      className: "h-7 w-full flex justify-center text-primaryGreen border-none",
      icons: <IoSearchSharp />,
    },
    {
      label: "Seleccionar",
      className: "h-7 !w-auto",
      icons: <FaCheck />,
    },
    {
      label: "Cancelar",
      customRed: true,
      className: "h-7 w-full flex justify-center ",
      icons: <IoMdClose />,
    },
  ];

  return (
    <div className="w- h-28 flex">
      <div className="w-full flex flex-wrap  gap-x-5 flex-row ">
        {inputs.map((item) => (
          <FlexibleInputField
            key={item.key}
            label={item.label}
            inputWidth={item.inputWidth}
            inputClassName={item.inputClassName}
            labelWidth={item.labelWidth}
            containerClassName={item.containerClassName}
          />
        ))}
      </div>
      <div className="  justify-center items-center flex flex-col gap-1 ">
        {buttonsModal.map((item, index) => (
          <Button
            key={index}
            label={item.label}
            custom={item.custom}
            customRed={item.customRed}
            classButton={item.className}
            icon={item.icons}
          />
        ))}
      </div>
    </div>
  );
}
