import { FlexibleInputField } from "@/frontend-resourses/components";

export default function ModalHeader() {
  const inputs = [
    {
      key: "apellido",
      label: "Apellido",
      labelWidth: "60px",
      inputWidth: "w-full",
      containerClassName: "!w-56 ",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
    },
    {
      key: "nombre",
      label: "Nombre",
      labelWidth: "60px",
      containerClassName: "!w-56 ",
      inputWidth: "w-full",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
    },
    {
      key: "dni",
      label: "DNI",
      labelWidth: "60px",
      containerClassName: "!w-56 ",
      inputWidth: "w-full",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
    },
    {
      key: "localidad",
      label: "Localidad",
      labelWidth: "60px",
      containerClassName: "!w-56 ",
      inputWidth: "w-full",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
    },
    {
      key: "domicilio",
      label: "Domicilio",
      labelWidth: "60px",
      containerClassName: "!w-96",

      inputWidth: "w-full",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
    },
  ];
  return (
    <div className="w- h-28 flex">
      <div className="w-5/6 flex flex-wrap gap-1 flex-row ">
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
      <div className="w-1/4 bg-yellow-50">.</div>
    </div>
  );
}
