import { FlexibleInputField } from "@/frontend-resourses/components";
import { usePacientesStore } from "../store/pacientesStore";
import { formatDate } from "@/utils/index";

export default function FormCard({ inputs, handleInputChange }) {
  const left = inputs.filter((i) => i.box === "left");
  const right = inputs.filter((i) => i.box === "right");
  const estado = usePacientesStore((state) => state.estado);
  const dataPaciente = usePacientesStore((state) => state.dataPaciente);

  return (
    <div className="flex flex-col w-full">
      <div>
        <p className="text-gray-600 text-lg font-semibold">Datos del paciente</p>
      </div>
      <div className="flex w-full gap-4 pt-2">
        <div className="w-1/2 flex flex-col items-start gap-2">
          {left.map((item) => (
            <FlexibleInputField
              key={item.key}
              value={dataPaciente?.[item.key] || ""}
              onChange={(value) => handleInputChange(item.key, value)}
              {...item}
              disabled={estado !== "m"}
            />
          ))}
        </div>

        <div className="w-1/2 flex flex-col items-start gap-2">
          {right.map((item) => {
            const raw = dataPaciente?.[item.key];
            const f_Alta =
              item.key === "f_alta" ? formatDate(new Date(raw as string)) : (raw ?? "");
            return (
              <FlexibleInputField
                key={item.key}
                value={f_Alta || dataPaciente?.[item.key] || ""}
                {...item}
                onChange={(value) => handleInputChange(item.key, value)}
                disabled={estado !== "m" || item.key === "f_alta"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
