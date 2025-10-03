import { FlexibleInputField } from "@/frontend-resourses/components";

export default function FormCard({ inputs }) {
  const left = inputs.filter((i) => i.box === "left");
  const right = inputs.filter((i) => i.box === "right");

  return (
    <div className="flex flex-col w-full">
      <div>
        <p className="text-gray-600 text-lg font-semibold">Datos del paciente</p>
      </div>
      <div className="flex w-full gap-4 pt-2">
        <div className="w-1/2 flex flex-col items-start gap-2">
          {left.map((item, idx) => (
            <FlexibleInputField key={item.label ?? idx} {...item} />
          ))}
        </div>

        <div className="w-1/2 flex flex-col items-start gap-2">
          {right.map((item, idx) => (
            <FlexibleInputField key={item.label ?? idx} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
