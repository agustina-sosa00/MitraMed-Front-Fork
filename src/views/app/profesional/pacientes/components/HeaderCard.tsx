import { close } from "@/frontend-resourses/assets/icons";
import { FlexibleInputField } from "@/frontend-resourses/components";
import { Button } from "@/views/_components/Button";

export default function HeaderCard() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-end justify-start w-full h-16 gap-20  ">
        <div className="flex items-end justify-start  h-16 gap-2">
          <FlexibleInputField
            label="HC"
            inputWidth="w-32"
            inputClassName="rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen"
            containerWidth="w-42"
          />
          <Button label="Procesar" height=" !h-7" />
          <Button
            classButton={` text-white text-xs h-7 `}
            padding="2"
            icon={<img src={close} alt="Cerrar" className={`w-3 h-3 grayscale opacity-40`} />}
            custom={true}
          />
        </div>
        <div className="flex items-end  justify-start h-16 gap-3">
          <FlexibleInputField
            label="Apellido"
            inputWidth="w-60"
            labelWidth="w-32"
            labelAlign="left"
            containerWidth="w-42"
            inputClassName="rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen"
          />
          <FlexibleInputField
            label="Nombre"
            inputWidth="w-60"
            labelWidth="w-32"
            labelAlign="left"
            containerWidth="w-42"
            inputClassName="rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen"
          />
        </div>
      </div>
      {/* divider */}
      <div className="w-full border border-gray-300"></div>
    </div>
  );
}
