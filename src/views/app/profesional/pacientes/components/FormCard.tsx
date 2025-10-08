import { FlexibleInputField } from "@/frontend-resourses/components";
import { usePacientesStore } from "../store/pacientesStore";
import { formatDate } from "@/utils/index";
import { ReactNode } from "react";

type InputType = "number" | "text" | "select" | "tel" | "email" | "date" | "textarea";
type Box = "left" | "right";

interface Field {
  label: string;
  key: string;
  inputWidth?: string;
  box: Box;
  type?: InputType;
  maxLength?: number;
  required?: boolean;
  options?: { value: string; label: string; hidden?: boolean }[];
  middleComponent?: ReactNode;
  rightComponent?: ReactNode;
  inputClassName?: string;
  containerWidth?: string;
  containerClassName?: string;
}

export default function FormCard({
  handleInputChange,
}: {
  handleInputChange: (k: string, v: string) => void;
}) {
  const dataPaciente = usePacientesStore((s) => s.dataPaciente);
  const estado = usePacientesStore((s) => s.estado);

  const inputs: Field[] = [
    {
      label: "DNI",
      key: "dni",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
      maxLength: 8,
      type: "text",
    },
    {
      label: "Cond. Trib",
      key: "ctrib",
      inputWidth: "w-60",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
      type: "select",
      options: [
        { value: "0", label: "" },
        { value: "CF", label: "Consumidor Final" },
        { value: "RI", label: "Responsable Inscripto" },
      ],
    },
    {
      label: "C.U.I.T",
      key: "cuil",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
      type: "text",
    },
    {
      label: "Domicilio",
      key: "domicilio1",
      inputWidth: "w-60",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
      type: "text",
    },

    {
      label: "Celular",
      key: "telefono",
      inputWidth: "w-28",
      inputClassName: "max-h-6 lg:max-h-7",
      type: "text",
      box: "right",
      maxLength: 7,
      required: true,
      middleComponent: (
        <div className="flex items-center gap-2">
          <FlexibleInputField
            inputType="text"
            key="codarea"
            value={dataPaciente?.codarea || ""}
            inputClassName="text-center max-h-6 lg:max-h-7"
            inputWidth="w-20"
            maxLength={5}
            disabled={estado !== "M"}
            onChange={(value) => handleInputChange("codarea", value)}
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
      type: "text",
    },
    {
      label: "Email",
      key: "email",
      inputWidth: "w-70",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
      type: "email",
    },
    {
      label: "Provincia",
      key: "provincia",
      inputWidth: "w-60",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
      type: "text",
    },
    {
      label: "Localidad",
      key: "localidad",
      inputWidth: "w-60",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
      type: "text",
    },
    {
      label: "Cod. Postal",
      key: "codPostal",
      inputWidth: "w-20",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
      type: "text",
    },
    {
      label: "Estado Civil",
      key: "idestadociv",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
      type: "text",
    },
    {
      label: "Sexo",
      key: "idsexo",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
      type: "text",
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
      type: "text",
    },
    {
      label: "Plan",
      key: "nplan",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
      type: "text",
    },
    {
      label: "Afiliado",
      key: "afiliado",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
      type: "text",
    },
    {
      label: "Obs",
      key: "obs",
      inputClassName: "rounded h-32 focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
      type: "textarea",
    },
  ];

  const left = inputs.filter((i) => i.box === "left");
  const right = inputs.filter((i) => i.box === "right");

  return (
    <div className="flex flex-col w-full">
      <div>
        <p className="text-gray-600 text-lg font-semibold">Datos del paciente</p>
      </div>

      <div className="flex w-full gap-4 pt-2">
        {/* Columna izquierda */}
        <div className="w-1/2 flex flex-col items-start gap-2">
          {left.map((item) => (
            <FlexibleInputField
              key={item.key}
              label={item.label}
              value={dataPaciente?.[item.key] ?? ""}
              inputType={item.type ?? "text"}
              inputWidth={item.inputWidth}
              maxLength={item.maxLength}
              options={item.type === "select" ? item.options : undefined}
              onChange={(v) => handleInputChange(item.key, v)}
              disabled={estado !== "M"}
              inputClassName={item.inputClassName}
              containerWidth={item.containerWidth}
              containerClassName={item.containerClassName}
            />
          ))}
        </div>

        {/* Columna derecha */}
        <div className="w-1/2 flex flex-col items-start gap-2">
          {right.map((item) => {
            const raw = dataPaciente?.[item.key];
            const f_Alta =
              item.key === "f_alta" && raw
                ? formatDate(new Date(String(raw).replace(" ", "T")))
                : "";

            return (
              <FlexibleInputField
                key={item.key}
                label={item.label}
                value={f_Alta || dataPaciente?.[item.key] || ""}
                inputType={item.type ?? "text"}
                inputWidth={item.inputWidth}
                maxLength={item.maxLength}
                options={item.type === "select" ? item.options : undefined}
                onChange={(v) => handleInputChange(item.key, v)}
                disabled={estado !== "M" || item.key === "f_alta"}
                inputClassName={item.inputClassName}
                containerWidth={item.containerWidth}
                containerClassName={item.containerClassName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
