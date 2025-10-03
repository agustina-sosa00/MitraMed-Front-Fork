import { FlexibleInputField } from "@/frontend-resourses/components";
import TitleView from "../../_components/features/TitleView";
import FormCard from "./components/FormCard";
import HeaderCard from "./components/HeaderCard";

export default function PacientesView() {
  const inputs = [
    {
      label: "DNI",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Cond. Trib",
      inputWidth: "w-60",
      type: "select",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
      selectOptions: [
        { value: "0", label: "", hidden: true },
        { value: "CF", label: "Consumidor Final" },
        { value: "RI", label: "Responsable Inscripto" },
      ],
    },
    {
      label: "C.U.I.T",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Domicilio",
      inputWidth: "w-60",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Celular",
      key: "telefono",
      inputWidth: "w-28",
      inputClassName: "max-h-6 lg:max-h-7",
      type: "text",
      box: "right",
      maxLength: 10,
      required: true,
      middleComponent: (
        <div className="flex items-center gap-2">
          <FlexibleInputField
            inputType="text"
            inputClassName="text-center max-h-6 lg:max-h-7"
            inputWidth="w-14"
            maxLength={6}
          />
          <span className="text-sm text-gray-400 font-medium">15</span>
        </div>
      ),
    },
    {
      label: "Tel. Fijo",
      inputWidth: "w-28",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
    },

    {
      label: "Email",
      inputWidth: "w-70",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
    },
    {
      label: "Provincia",
      inputWidth: "w-60",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Localidad",
      inputWidth: "w-60",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Cod. Postal",
      inputWidth: "w-20",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Estado Civil",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Sexo",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
    },
    {
      label: "Fecha Nac.",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
    },
    {
      label: "F. Alta",
      inputWidth: "w-60",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
    },
    {
      label: "Obra Social",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Plan",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Afiliado",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Obs",
      // inputWidth: "w-80",
      inputClassName: "rounded h-32 focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      inputType: "textarea",
      box: "right",
    },
  ];
  return (
    <>
      <TitleView title="Pacientes" />
      <div className="flex flex-col w-full gap-5">
        <HeaderCard />
        <FormCard inputs={inputs} />
      </div>
    </>
  );
}
