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
      <label htmlFor={label} className="font-semibold text-lg p-1">
        {label}:
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full p-2 max-w-2xl font-semibold bg-white border-2 border-opacity-40 border-slate-500 outline-none transition duration-200 focus:ring-2 placeholder:text-base ${className}`}
        {...register}
      />
    </div>
  );
}
