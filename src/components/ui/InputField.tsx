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
  setShow?: () => void;
};

export default function InputField({
  id,
  type,
  label,
  placeholder,
  register,
  className,
  show,
  setShow,
}: InputFieldProps) {
  const handleButtonEye = () => {
    if (setShow) setShow();
  };
  return (
    <div className="flex flex-col mb-1">
      <label
        htmlFor={label}
        className="font-semibold text-gray-700 sm:text-lg xl:text-2xl"
      >
        {label}
      </label>
      <div className="relative flex justify-center ">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full px-2 py-1 sm:p-2 xl:p-3 max-w-2xl xl:mt-2 xl:text-lg font-semibold bg-white rounded-xl border border-opacity-40 border-slate-500 outline-none transition duration-200 focus:ring-1 focus:ring-greenFocus placeholder:text-sm xl:placeholder:text-lg placeholder:text-gray-300 placeholder:font-medium ${className}`}
          {...register}
        />

        <button
          type="button"
          className={`absolute right-4 xl:right-6 top-3 md:top-4 xl:top-7 xl:text-2xl   text-gray-700 ${
            id !== "password" && "hidden"
          }`}
          onClick={handleButtonEye}
        >
          {show ? <FiEye /> : <FiEyeOff />}
        </button>
      </div>
    </div>
  );
}
