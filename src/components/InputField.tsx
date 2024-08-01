import { UseFormRegisterReturn } from 'react-hook-form';

type InputFieldProps = {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
};

export default function InputField({ id, type, label, placeholder, register }: InputFieldProps) {
  return (
    <div className="flex flex-col mb-1">
      <label htmlFor={label} className="font-semibold text-lg p-1">
        {label}:
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full p-2 max-w-2xl font-semibold bg-white border-2 border-opacity-40 border-slate-500 outline-none transition duration-200 focus:border-blue-300"
        {...register}
      />
    </div>
  );
}

// <label className="relative flex items-center w-full" htmlFor={id}>
//   <input
//     id={id}
//     type={type}
//     {...register}
//     onChange={handleChange}
//     className={`w-full p-3 max-w-2xl font-semibold bg-white border-2 border-opacity-40 border-slate-500 outline-none transition duration-200
//     focus:border-blue-500`}
//   />
//   <span
//     className={`text-slate-400 text-opacity-60 absolute font-semibold left-0 top-2 px-3 mt-2 transition duration-200 input-text ${
//       value ? 'filled' : ''
//     }`}
//   >
//     {placeholder}
//   </span>
// </label>
