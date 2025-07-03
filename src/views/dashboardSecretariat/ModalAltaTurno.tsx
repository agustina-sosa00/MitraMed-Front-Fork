// import InputField from "@/components/ui/InputField";
import { BoxButton } from "@/components/features/PanelProfessional/BoxButton";
import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
interface IProp {
  close?: () => void;
}
export const ModalAltaTurno: React.FC<IProp> = ({ close }) => {
  const [formState, setFormState] = useState({
    hc: "",
    name: "agustina sosa",
    obs: "",
    codarea: "",
    tel: "",
  });
  console.log(formState);
  const handleClose = () => {
    close && close();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl p-8 bg-white rounded ">
      <form
        action=""
        className="flex flex-col w-full gap-2"
        onSubmit={handleOnSubmit}
      >
        <div className="flex justify-between w-full gap-1 ">
          <div className="flex items-center w-1/3 gap-1 ml-1">
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            <label className="text-sm font-medium text-blue" htmlFor="hc">
              HC{" "}
            </label>
            <input
              type="text"
              name="hc"
              value={formState.hc}
              onChange={handleOnChange}
              id="hc"
              placeholder="000111"
              className={`px-2 py-1 text-sm font-bold border w-full border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-green focus:border-green `}
            />
          </div>
          <button className="flex items-center justify-center w-8 transition-all duration-300 border border-gray-300 rounded bg-lightGray text-greenHover hover:bg-gray-200">
            <FaMagnifyingGlass />
          </button>
          <div className="flex items-center w-2/3 gap-1">
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleOnChange}
              id="name"
              placeholder="Agustina Sosa"
              className={`px-2 py-1 text-sm font-bold border w-full border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-green focus:border-green `}
              readOnly
            />
          </div>
        </div>
        <div className="flex items-center w-full gap-1 ">
          {/* --------- */}
          {/* --------- */}
          {/* --------- */}
          {/* --------- */}
          {/* --------- */}
          {/* --------- */}
          {/* --------- */}
          {/* --------- */}
          <label className="text-sm font-medium text-blue" htmlFor="hc">
            Obs
          </label>
          <textarea
            name="obs"
            value={formState.obs}
            onChange={handleOnChange}
            id="obs"
            placeholder="..."
            className={`px-2 py-1 text-sm font-bold border w-full border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-green focus:border-green `}
          />
        </div>
        <div className="flex items-center w-full gap-1 ">
          {/* --------- */}
          {/* --------- */}
          {/* --------- */}
          {/* --------- */}
          {/* --------- */}
          {/* --------- */}
          {/* --------- */}
          {/* --------- */}
          <label className="text-sm font-medium text-blue" htmlFor="hc">
            Celular
          </label>
          <input
            type="text"
            name="codarea"
            value={formState.codarea}
            onChange={handleOnChange}
            id="codarea"
            placeholder="11"
            className={`px-2 py-1 text-sm font-bold border w-full border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-green focus:border-green `}
          />
          <label className="text-sm font-medium text-blue" htmlFor="hc">
            15
          </label>
          <input
            type="text"
            name="tel"
            value={formState.tel}
            onChange={handleOnChange}
            id="tel"
            placeholder="22334455"
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
                ? "px-4 py-2 bg-green text-white capitalize rounded hover:bg-greenHover transition-all duration-300"
                : "px-4 py-2 bg-red-500 text-white capitalize rounded hover:bg-red-600 transition-all duration-300"
            }
            classContainer=" gap-2 flex "
          />
        </div>
      </form>
    </div>
  );
};
