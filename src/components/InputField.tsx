import { UseFormRegisterReturn } from 'react-hook-form';

type InputFieldProps = {
  id: string;
  type: string;
  label?: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  className?: string;
};

export default function InputField({
  id,
  type,
  label,
  placeholder,
  register,
  className,
}: InputFieldProps) {
  return (
    <div className="flex flex-col mb-1">
      <label htmlFor={label} className="font-semibold sm:text-lg p-1 text-gray-700">
        {label}:
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full px-2 py-1 sm:p-2 max-w-2xl font-semibold bg-white border border-opacity-40 border-slate-500 outline-none transition duration-200 focus:ring-1 placeholder:text-sm placeholder:text-gray-300 placeholder:font-medium ${className}`}
        {...register}
      />
    </div>
  );
}
