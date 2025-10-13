import { FlexibleInputField } from "@/frontend-resourses/components";
import { usePacientesStore } from "../store/pacientesStore";
import { formatearFechaDMA } from "@/utils/index";
import { ReactNode, useRef } from "react";

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

export default function FormCard({ handleInputChange }) {
  const dataPaciente = usePacientesStore((s) => s.dataPaciente);
  const dataPacientesModi = usePacientesStore((s) => s.dataPacientesModi);
  const estado = usePacientesStore((s) => s.estado);
  const dataInputs = estado === "C" ? dataPaciente : estado === "M" ? dataPacientesModi : null;
  const gridRef = useRef<HTMLDivElement>(null);

  function handleEnterNavigation(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    e.stopPropagation();
    const root = gridRef.current;
    if (!root) return;
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'input:not([type="hidden"]):not([disabled]):not([readonly]), textarea:not([disabled]):not([readonly]), select:not([disabled]):not([readonly])',
      ),
    );
    if (focusables.length === 0) return;
    const active = (document.activeElement as HTMLElement) || null;
    const idx = focusables.findIndex((el) => el === active || (!!active && el.contains(active)));
    if (idx === -1) {
      focusables[0].focus();
      return;
    }
    const next = focusables[idx + 1];
    if (next) next.focus();
  }

  //region inputs
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
      inputWidth: "w-20",
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
            inputWidth="w-16"
            maxLength={5}
            disabled={estado !== "M"}
            onChange={(value) => handleInputChange("codarea", value)}
          />
          <span className="text-sm text-gray-500 font-medium">15</span>
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
      type: "select",
      options: [
        { value: "0", label: "" },
        { value: "BSAS", label: "Buenos Aires" },
        { value: "COR", label: "Cordoba" },
      ],
    },
    {
      label: "Localidad",
      key: "localidad",
      inputWidth: "w-60",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "left",
      type: "select",
      options: [
        { value: "0", label: "" },
        { value: "LDZ", label: "Lomas de Zamora" },
        { value: "LAN", label: "Lanús" },
      ],
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
      type: "select",
      options: [
        { value: "0", label: "" },
        { value: "SOL", label: "Soltero" },
        { value: "CAS", label: "Casado" },
      ],
    },
    {
      label: "Sexo",
      key: "idsexo",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
      type: "select",
      options: [
        { value: "0", label: "" },
        { value: "FEM", label: "Femenino" },
        { value: "MAS", label: "Masculino" },
      ],
    },
    {
      label: "Fecha Nac.",
      key: "fnacim",
      inputWidth: "w-40",
      inputClassName: "rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
      // si querés un placeholder tipo “dd/mm/aaaa” configurarlo en FlexibleInputField
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
      type: "select",
      options: [
        { value: "0", label: "" },
        { value: "MED", label: "Medife" },
        { value: "OTR", label: "Otros" },
      ],
    },
    {
      label: "Plan",
      key: "nplan",
      inputWidth: "w-40",
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
      inputClassName: "rounded !h-24 focus:outline-none focus:ring-1 focus:ring-primaryGreen",
      box: "right",
      type: "text",
    },
  ];

  const left = inputs.filter((i) => i.box === "left");
  const right = inputs.filter((i) => i.box === "right");

  //region return
  return (
    <div className="flex flex-col w-full">
      <div>
        <p className="text-gray-600 text-lg font-semibold">Datos del paciente</p>
      </div>

      <div ref={gridRef} onKeyDown={handleEnterNavigation} className="flex w-full gap-4 pt-2">
        <div className="w-1/2  flex flex-col items-start gap-2">
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

        <div className="w-1/2 flex flex-col items-start gap-2">
          {right.map((item) => {
            const raw = dataInputs?.[item.key];
            const f_Alta =
              item.key === "f_alta" && raw ? formatearFechaDMA(new Date(String(raw)), true) : "";

            const f_nac =
              item.key === "fnacim" && raw ? formatearFechaDMA(new Date(String(raw))) : "";

            return (
              <FlexibleInputField
                key={item.key}
                label={item.label}
                value={f_Alta || f_nac || dataInputs?.[item.key] || ""}
                inputType={item.type ?? "text"}
                inputWidth={item.inputWidth}
                maxLength={item.maxLength}
                options={item.type === "select" ? item.options : undefined}
                onChange={(v) => handleInputChange(item.key, v)}
                disabled={estado !== "M" || item.key === "f_alta"}
                inputClassName={item.inputClassName}
                containerWidth={item.containerWidth}
                containerClassName={item.containerClassName}
                middleComponent={item.middleComponent}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
