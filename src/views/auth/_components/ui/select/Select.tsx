import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { ControllerRenderProps } from "react-hook-form";

type Props = {
  label: string;
  placeholder: string;
  options: (string | number)[];
  field: ControllerRenderProps<{
    nombre: string;
    apellido: string;
    email: string;
    fnac: string;
    codarea: string;
    telefono: string;
    genero: string;
    password?: string | undefined;
    confirmPassword?: string | undefined;
    dni?: string | undefined;
  }>;
};

export const Select = ({ label, placeholder, options, field }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const selected = field.value;
  return (
    <div className="relative w-full ">
      <label className="block mb-1 text-sm font-semibold text-blue">
        {label}
      </label>
      <div
        className="flex items-center justify-between w-full px-2 py-1 bg-white border border-gray-300 cursor-pointer text-blue"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? (
          <span className="text-blue">{selected}</span>
        ) : (
          <p className="text-sm font-medium text-gray-300">{placeholder}</p>
        )}
        <IoIosArrowDown
          className={`transition-all duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 shadow max-h-40">
          {options.map((opt, i) => (
            <div
              key={i}
              className="p-2 cursor-pointer hover:bg-greenHover text-blue hover:text-white"
              onClick={() => {
                field.onChange(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
