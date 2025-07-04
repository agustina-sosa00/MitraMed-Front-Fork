import { Dispatch, SetStateAction } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

type InputFieldProps = {
  id: string;
  type: string;
  label?: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  className?: string;
  show?: boolean;
  setShow?: Dispatch<SetStateAction<boolean>>;
  readOnly?: boolean;
};

export default function InputField({
  id,
  type,
  label,
  placeholder,
  register,
  className,
  show,
  readOnly,
  setShow,
}: InputFieldProps) {
  const handleButtonEye = () => {
    if (setShow) setShow(!show);
  };
  return (
    <div className="flex flex-col mb-1">
      <label
        htmlFor={label}
        className="font-semibold text-gray-700 sm:text-base"
      >
        {label}
      </label>
      <div className="relative flex justify-center ">
        <input
          id={id}
          type={type}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`w-full px-2 py-1  max-w-2xl xl:mt-2 text-sm font-semibold bg-white  border border-opacity-40 border-gray-400 outline-none transition duration-200 focus:ring-1 focus:ring-greenFocus placeholder:text-sm xl:placeholder:text-sm placeholder:text-gray-300 placeholder:font-medium ${className}`}
          {...register}
        />

        <button
          type="button"
          className={`absolute right-4 xl:right-6 top-3 md:top-2 xl:top-7 xl:text-2xl   text-gray-700 ${
            (id === "tel" ||
              id === "codarea" ||
              id === "email" ||
              id === "genero" ||
              id === "fnac" ||
              id === "apellido" ||
              id === "nombre" ||
              id === "hc" ||
              id === "usuario") &&
            "hidden"
          }`}
          onClick={handleButtonEye}
        >
          {show ? <FiEye /> : <FiEyeOff />}
        </button>
      </div>
    </div>
  );
}
