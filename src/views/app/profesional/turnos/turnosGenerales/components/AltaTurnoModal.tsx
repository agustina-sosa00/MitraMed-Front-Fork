// import InputField from "@/components/ui/InputField";
import {
  dataPatient,
  IFormState,
} from "@/views/app/profesional/turnos/turnosProfesional/mock/arrayTableProfessional";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Button } from "@/views/_components/Button";
import { useMutation } from "@tanstack/react-query";
import { obtenerPacienteHc } from "../../../hc/service/HistorialClinicoService";
import { Loader } from "@/views/auth/_components/ui/Loader";

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
  const [loader, setLoader] = useState(false);
  const { mutate: mutationObtenerPacienteHc } = useMutation({
    mutationFn: () => obtenerPacienteHc({ dni: formState.hc }),
    onError: (error) => {
      throw new Error(`Error obteniendo datos del HC: ${error}`);
    },
    onSuccess: (data) => {
      console.log(data);
      const paciente = data.data.paciente;
      setFormState({
        ...formState,
        name: paciente.nombre + " " + paciente.apellido,
        codarea: null,
        tel: null,
      });
    },
  });

  function handleClose() {
    close && close();
  }

  function handleOnChange(e) {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  }

  function handleFindPatient() {
    setLoader(true);
    setTimeout(() => {
      mutationObtenerPacienteHc();
      setLoader(false);
    }, 2000);
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl px-5 bg-white rounded ">
      <form
        action=""
        className="flex flex-col w-full gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="flex justify-start w-full gap-1 ">
          <div className="flex items-center gap-1 ">
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            {/* --------- */}
            <label className="text-sm font-medium text-end min-w-16 text-primaryBlue" htmlFor="hc">
              HC
            </label>
            <input
              type="text"
              name="hc"
              value={formState.hc}
              onChange={handleOnChange}
              onKeyDown={(e) => {
                console.log(e.key);
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  handleFindPatient();
                }
                if (e.key === "Escape") {
                  e.preventDefault();
                  e.stopPropagation();
                  setFormState((prev) => ({ ...prev, hc: "" }));
                  (e.target as HTMLInputElement).focus();
                }
              }}
              id="hc"
              className={`px-1 py-1 text-sm text-center font-bold border w-20 border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-primaryGreen focus:border-primaryGreen `}
            />
          </div>
          <button
            type="button"
            onClick={handleFindPatient}
            className="flex items-center justify-center w-8 transition-all duration-300 border border-gray-300 rounded bg-lightGray text-greenHover hover:bg-greenHover hover:text-white"
          >
            {loader ? (
              <svg className="w-6 h-6 circle-loader animate-spin" viewBox="25 25 50 50">
                <circle r="16" cy="50" cx="50" className="circleNormal"></circle>
              </svg>
            ) : (
              <FaMagnifyingGlass />
            )}
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
            className={`px-1 py-1 text-sm font-bold border text-center w-12 border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-primaryGreen focus:border-primaryGreen `}
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
            className={`px-1 text-center py-1 text-sm font-bold border w-20 border-gray-300 rounded  bg-lightGray focus:outline-none focus:ring-1 focus:ring-primaryGreen focus:border-primaryGreen `}
          />
        </div>
        <div className="flex items-end justify-end w-full gap-3 ">
          <Button
            label="Grabar"
            classButton="bg-primaryGreen hover:bg-greenHover"
            type="button"
            handle={() => handleChange(formState)}
          />
          <Button label="Cancelar" classButton="bg-red-500 hover:bg-red-600" handle={handleClose} />
        </div>
      </form>
    </div>
  );
}
