// import InputField from "@/components/ui/InputField";
import {
  dataPatient,
  IFormState,
} from "@/views/app/profesional/turnos/turnosProfesional/mock/arrayTableProfessional";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Button } from "@/views/_components/Button";

interface IProp {
  close?: () => void;
  handleChange: (form: IFormState) => void;
}

export default function AltaTurnoModal({ close, handleChange }: IProp) {
  const [formState, setFormState] = useState<IFormState>({
    hc: "",
    name: "",
    obs: "",
    codarea: null,
    tel: null,
  });
  function handleClose() {
    close && close();
  }

  function handleOnChange(e) {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  }

  function handleFindPatient() {
    const hc = formState.hc;
    const patient = dataPatient.find((item) => item.hc === hc);
    setFormState({
      ...formState,
      name: patient?.name || "",
      codarea: patient?.codarea || 0,
      tel: patient?.telefono || 0,
    });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl p-8 bg-white rounded ">
      <form action="" className="flex flex-col w-full gap-2" onSubmit={handleOnSubmit}>
        <div className="flex justify-between w-full gap-1 ">
          <div className="flex items-center w-1/3 gap-1 ">
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            <label className="text-sm font-medium text-end min-w-16 text-primaryBlue" htmlFor="hc">
              HC{" "}
            </label>
            <input
              type="text"
              name="hc"
              value={formState.hc}
              onChange={handleOnChange}
              id="hc"
              placeholder="0011"
              className={`px-2 py-1 text-sm font-bold border w-full border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-primaryGreen focus:border-primaryGreen `}
            />
          </div>
          <button
            type="button"
            onClick={handleFindPatient}
            className="flex items-center justify-center w-8 transition-all duration-300 border border-gray-300 rounded bg-lightGray text-greenHover hover:bg-gray-200"
          >
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
              className={`px-2 py-1 text-sm font-bold border w-full border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-primaryGreen focus:border-primaryGreen `}
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
          <label className="text-sm font-medium text-end min-w-16 text-primaryBlue" htmlFor="hc">
            Obs
          </label>
          <textarea
            name="obs"
            value={formState.obs}
            onChange={handleOnChange}
            id="obs"
            placeholder="..."
            className={`px-2 py-1 text-sm font-bold border w-full border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-primaryGreen focus:border-primaryGreen `}
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
          <label className="text-sm font-medium text-end min-w-16 text-primaryBlue" htmlFor="hc">
            Celular
          </label>
          <input
            type="text"
            name="codarea"
            value={formState.codarea !== null ? String(formState.codarea) : ""}
            onChange={handleOnChange}
            id="codarea"
            placeholder="11"
            className={`px-2 py-1 text-sm font-bold border w-20 border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-primaryGreen focus:border-primaryGreen `}
          />
          <label className="text-sm font-medium text-primaryBlue" htmlFor="hc">
            15
          </label>
          <input
            type="text"
            name="tel"
            value={formState.tel !== null ? String(formState.tel) : ""}
            onChange={handleOnChange}
            id="tel"
            placeholder="22334455"
            className={`px-2 py-1 text-sm font-bold border w-36 border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-primaryGreen focus:border-primaryGreen `}
          />
        </div>
        <div className="flex items-end justify-end w-full gap-3 ">
          <Button
            label="Guardar"
            classButton="bg-primaryGreen hover:bg-greenHover"
            type="submit"
            handle={() => handleChange(formState)}
          />
          <Button label="Cancelar" classButton="bg-red-500 hover:bg-red-600" handle={handleClose} />
        </div>
      </form>
    </div>
  );
}
