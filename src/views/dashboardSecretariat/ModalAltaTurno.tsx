// import InputField from "@/components/ui/InputField";
import { BoxButton } from "@/components/features/PanelProfessional/BoxButton";
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
interface IProp {
  close?: () => void;
}
export const ModalAltaTurno: React.FC<IProp> = ({ close }) => {
  const handleClose = () => {
    close && close();
  };
  return (
    <div className="flex flex-col items-center w-full max-w-2xl p-8 bg-white rounded ">
      <form action="" className="flex flex-col w-full gap-2">
        <div className="flex justify-between w-full gap-1 ">
          <div className="flex items-center w-1/3 gap-1 ml-1">
            <label className="text-sm font-medium text-blue" htmlFor="hc">
              HC{" "}
            </label>
            <input
              type="text"
              name="hc"
              id="hc"
              placeholder="000111"
              className={`px-2 py-1 text-sm font-bold border w-full border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-green focus:border-green `}
            />
          </div>
          <button className="flex items-center justify-center w-8 transition-all duration-300 border border-gray-300 rounded bg-lightGray text-greenHover hover:bg-gray-200">
            <FaMagnifyingGlass />
          </button>
          <div className="flex items-center w-2/3 gap-1">
            <input
              type="text"
              name="hc"
              id="hc"
              placeholder="000111"
              className={`px-2 py-1 text-sm font-bold border w-full border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-green focus:border-green `}
              readOnly
            />
          </div>
        </div>
        <div className="flex items-center w-full gap-1 ">
          <label className="text-sm font-medium text-blue" htmlFor="hc">
            Obs
          </label>
          <textarea
            name="hc"
            id="hc"
            placeholder="000111"
            className={`px-2 py-1 text-sm font-bold border w-full border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-green focus:border-green `}
          />
        </div>
        <div className="flex items-center w-full gap-1 ">
          <label className="text-sm font-medium text-blue" htmlFor="hc">
            Celular
          </label>
          <input
            type="text"
            name="hc"
            id="hc"
            placeholder="000111"
            className={`px-2 py-1 text-sm font-bold border w-full border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-green focus:border-green `}
          />
          <label className="text-sm font-medium text-blue" htmlFor="hc">
            15
          </label>
          <input
            type="text"
            name="hc"
            id="hc"
            placeholder="000111"
            className={`px-2 py-1 text-sm font-bold border w-full border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-green focus:border-green `}
          />
        </div>
        <div className="flex justify-end w-full">
          <BoxButton
            button={["guardar", "cancelar"]}
            handleButton={(val) => {
              if (val === "guardar") {
                console.log("Guardar turno");
              } else {
                handleClose();
              }
            }}
            classButton={(btn) =>
              btn === "guardar"
                ? "px-4 py-2 bg-green text-white rounded hover:bg-greenHover transition-all duration-300"
                : "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300"
            }
            classContainer=" gap-2 flex "
          />
        </div>
      </form>
    </div>
  );
};

{
  /* <InputField id="hc" type="text" label="HC" placeholder="HC" register={register("password", {
              required: {
                value: true,
                message: "La contraseña es obligatoria",
              },
              minLength: {
                value: 5,
                message: "La contraseña debe tener mínimo 8 caracteres",
              },
            })}/> */
}
