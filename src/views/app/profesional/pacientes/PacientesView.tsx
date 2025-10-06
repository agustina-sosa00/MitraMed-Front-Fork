import { FlexibleInputField } from "@/frontend-resourses/components";
import TitleView from "../../_components/features/TitleView";
import FormCard from "./components/FormCard";
import HeaderCard from "./components/HeaderCard";
import { usePacientesStore } from "./store/pacientesStore";

export default function PacientesView() {
  const dataPaciente = usePacientesStore((state) => state.dataPaciente);
  const estado = usePacientesStore((state) => state.estado);

  const inputs = [
    {
      label: "DNI",
      key: "dni",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Cond. Trib",
      inputWidth: "w-60",
      key: "ctrib",
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
      key: "cuil",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Domicilio",
      inputWidth: "w-60",
      key: "domicilio1",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    // {
    //   label: "",
    //   inputWidth: "w-60",
    //   key: "domicilio2",
    //   inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
    //   box: "left",
    // },
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
            key="codarea"
            value={dataPaciente?.codarea || ""}
            inputClassName="text-center max-h-6 lg:max-h-7"
            inputWidth="w-14"
            maxLength={6}
            disabled={estado !== "m"}
          />
          <span className="text-sm text-gray-400 font-medium">15</span>
        </div>
      ),
    },
    {
      label: "Tel. Fijo",
      key: "telFijo",
      inputWidth: "w-28",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
    },

    {
      label: "Email",
      key: "email",
      inputWidth: "w-70",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
    },
    {
      label: "Provincia",
      key: "provincia",
      inputWidth: "w-60",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Localidad",
      key: "localidad",
      inputWidth: "w-60",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Cod. Postal",
      key: "codPostal",
      inputWidth: "w-20",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Estado Civil",
      key: "idestadociv",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
    },
    {
      label: "Sexo",
      key: "idsexo",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
    },
    {
      label: "Fecha Nac.",
      key: "fnacim",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
    },
    {
      label: "F. Alta",
      key: "f_alta",
      inputWidth: "w-60",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
    },
    {
      label: "Obra Social",
      key: "nosocial",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Plan",
      key: "nplan",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Afiliado",
      key: "afiliado",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
    },
    {
      label: "Obs",
      key: "obs",
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
