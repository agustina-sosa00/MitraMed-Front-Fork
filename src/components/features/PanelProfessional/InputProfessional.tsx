import React from "react";

interface IProp {
  valueInput?: string;
  handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextarea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholderInput?: string;
  nameInput?: string;
  typeInput?: string;
  labelInput?: string;
  requiredInput?: boolean;
  field?: boolean;
}
export const InputProfessional: React.FC<IProp> = ({
  valueInput,
  handleInput,
  handleTextarea,
  placeholderInput,
  nameInput,
  typeInput,
  labelInput,
  requiredInput,
  field,
}) => {
  return (
    <div className="flex w-full">
      <div className=" w-36">
        <label
          htmlFor=""
          className="mr-2 text-sm font-medium capitalize text-blue"
        >
          {labelInput}:
        </label>
      </div>
      {field ? (
        <input
          required={requiredInput}
          type={typeInput ? typeInput : "text"}
          name={nameInput}
          value={valueInput}
          placeholder={placeholderInput}
          onChange={handleInput}
          className="flex-[1] h-8 px-2 py-1 font-bold border border-gray-300 rounded bg-lightGray focus:outline-none text-blue"
        />
      ) : (
        <textarea
          name={nameInput}
          value={valueInput}
          placeholder={placeholderInput}
          onChange={handleTextarea}
          className=" flex-[1] px-2 py-1 overflow-hidden font-bold border border-gray-300 rounded  bg-lightGray focus:outline-none text-blue h-44"
        ></textarea>
      )}
    </div>
  );
};
