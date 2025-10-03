import { FlexibleInputField } from "@/frontend-resourses/components";
import { Button } from "@/views/_components/Button";
import { IoClose } from "react-icons/io5";
import { usePacientesStore } from "../store/pacientesStore";
import { useEffect, useRef } from "react";

export default function HeaderCard() {
  const estado = usePacientesStore((state) => state.estado);
  const autofocusHC = estado === "i";
  const inputRefHc = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autofocusHC) {
      inputRefHc.current?.focus();
    }
  }, [estado]);
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-end justify-start w-full h-10 gap-10  ">
        <div className="flex items-end justify-start  h-16 gap-2">
          <FlexibleInputField
            label="HC"
            inputRef={inputRefHc}
            inputWidth="w-32"
            labelWidth="60px"
            inputClassName="rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen"
            containerWidth="w-42"
          />
          <Button label="Procesar" height=" !h-7" disabledButton={estado !== "i"} />
          <Button
            icon={<IoClose />}
            classButton={` text-red-600  h-7 bg-gray-200 border-none hover:bg-gray-300`}
            padding="2"
            custom={true}
            disabledButton={estado !== "c"}
          />
        </div>
        <div className="flex-[1] h-7 flex gap-2 justify-end">
          <Button label="Editar" classButton="h-7" disabledButton={estado !== "m"} />
          <Button
            label="Cancelar"
            classButton={`h-7 ${estado !== "m" ? "" : " bg-red-500 hover:bg-red-600"} `}
            disabledButton={estado !== "m"}
          />
          <Button label="Guardar en BBDD" classButton="h-7" disabledButton={estado !== "m"} />
          <Button
            label="Borrar de BBDD"
            classButton={`h-7 ${estado !== "m" ? "" : " bg-red-500 hover:bg-red-600"} `}
            disabledButton={estado !== "m"}
          />
        </div>
      </div>
      <div className="flex items-end  justify-start  gap-3">
        <FlexibleInputField
          label="Apellido"
          inputWidth="w-50"
          labelWidth="60px"
          labelAlign="left"
          containerWidth="w-42"
          inputClassName="rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen"
          disabled
        />
        <FlexibleInputField
          label="Nombre"
          inputWidth="w-60"
          labelWidth="60px"
          labelAlign="left"
          containerWidth="w-42"
          inputClassName="rounded focus:outline-none focus:ring-1 focus:ring-primaryGreen"
          disabled
        />
      </div>
      {/* divider */}
      <div className="w-full border border-gray-300"></div>
    </div>
  );
}
