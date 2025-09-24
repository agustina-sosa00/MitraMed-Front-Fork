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
  focusState?: boolean;
  focusName?: string;
}
export default function InputProfesionales({
  valueInput,
  handleInput,
  handleTextarea,
  placeholderInput,
  nameInput,
  typeInput,
  labelInput,
  requiredInput,
  field,
  focusState,
}: IProp) {
  function formatearObs(obs: string) {
    return obs
      .split("_")
      .map((item) => item.split("@")[0])
      .filter((val) => val && val !== "10")
      .join("\n");
  }

  return (
    <div className="flex w-full">
      {field ? (
        <>
          <label
            htmlFor=""
            className="flex justify-end items-center w-36 text-right mr-2 text-sm text-primaryBlue"
          >
            {labelInput}:
          </label>
          <input
            required={requiredInput}
            type={typeInput ? typeInput : "text"}
            name={nameInput}
            value={valueInput}
            placeholder={placeholderInput}
            onChange={handleInput}
            className="flex-[1] h-8 px-2 py-1 border border-gray-300 rounded bg-white tracking-wide font-medium focus:outline-none text-primaryBlue focus:bg-sky-50 focus:ring"
            readOnly={focusState}
          />
        </>
      ) : (
        <>
          <label
            htmlFor=""
            className="flex justify-end w-36 text-right mr-2 text-sm text-primaryBlue"
          >
            {labelInput}:
          </label>
          <textarea
            name={nameInput}
            value={valueInput ? formatearObs(valueInput) : ""}
            placeholder={placeholderInput}
            onChange={handleTextarea}
            className=" flex-[1] h-44 px-2 py-1 border border-gray-300 rounded bg-white tracking-wide font-medium focus:outline-none text-primaryBlue focus:bg-sky-50 focus:ring"
            readOnly={focusState}
          ></textarea>
        </>
      )}
    </div>
  );
}
