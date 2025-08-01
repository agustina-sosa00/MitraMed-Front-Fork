import { Button } from "@/components/ui/Button";
import { useMedicalHistoryContext } from "../../../context/MedicalHistoryContext";
import React, { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { SearchPatientProps } from "../../../mock/arrayTableProfessional";

export const SearchPatient: React.FC<SearchPatientProps> = ({
  handleFindPatient,
  viewImg,

  labelSearch,
  data,
  noHc,
  setStateModal,
}) => {
  const { numHistory, setNumHistory } = useMedicalHistoryContext();
  const [isEditing, setIsEditing] = useState(false);
  const handleOnChangeDni = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumHistory(e.target.value);
  };

  return (
    <>
      {!isEditing && numHistory.length > 0 ? (
        <div
          className={`flex  py-1 h-16 justify-between gap-1 w-full ${
            viewImg ? "items-end" : "items-center"
          } `}
        >
          <div className="flex items-center gap-1">
            <label className="text-sm font-medium text-blue">
              {labelSearch}:{" "}
            </label>
            <div className="h-8 px-2 py-1 font-bold border border-gray-300 rounded w-28 bg-lightGray focus:outline-none text-blue">
              {numHistory}
            </div>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center h-8 px-2 py-1 transition-all duration-300 border border-gray-300 rounded bg-lightGray text-greenHover hover:bg-gray-200"
            >
              <FaPencil />
            </button>
          </div>

          <div className="flex flex-col justify-center w-1/2 gap-1 px-3 text-sm border border-gray-300 rounded xl:w-2/3 xl:text-base bg-lightGray text-blue">
            <div className="flex w-full gap-4">
              <h3 className="w-1/3 ">
                Apellido: <span className="font-medium">{data.lastName}</span>{" "}
              </h3>
              <h3 className="w-1/3 ">
                Nombre: <span className="font-medium">{data.name}</span>{" "}
              </h3>{" "}
              <h3 className="w-1/3 ">
                Edad: <span className="font-medium">{data.age}</span>{" "}
              </h3>
            </div>
            <div className="flex justify-start w-full gap-1">
              {" "}
              <h3 className="w-1/3 ">
                DNI: <span className="font-medium">{data.dni}</span>{" "}
              </h3>
              <h3 className=" text-start">
                F. Nacimiento: <span className="font-medium">{data.fnac}</span>{" "}
              </h3>
              <div className=""></div>
            </div>

            <h3 className="w-1/3 ">
              O. Social: <span className="font-medium">{data.obs}</span>{" "}
            </h3>

            {/* datos para mostrar de historial medico opcionales */}
            {viewImg && (
              <img
                src="/user.jpg"
                alt="user"
                className="w-16 h-16 border border-gray-300 rounded-full"
              />
            )}
          </div>

          <Button
            label="agregar consulta"
            handle={() => setStateModal && setStateModal(true)}
          />
        </div>
      ) : (
        <div
          className={`flex  py-1 h-16 justify-start gap-1 w-full ${
            viewImg ? "items-end" : "items-center"
          } `}
        >
          <label className="text-sm font-medium text-blue">
            {labelSearch}:{" "}
          </label>
          <div className="relative ">
            <input
              type="text"
              name="dni"
              value={numHistory}
              placeholder="11222333"
              onChange={handleOnChangeDni}
              className={`h-8 px-2 py-1 font-bold border  rounded w-28 bg-lightGray focus:outline-none text-blue ${
                noHc ? "border-red-500" : "border-gray-300 "
              } `}
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              handleFindPatient(numHistory);
            }}
            className="flex items-center justify-center h-8 px-2 py-1 transition-all duration-300 border border-gray-300 rounded bg-lightGray text-greenHover hover:bg-gray-200"
          >
            <FaMagnifyingGlass />
          </button>
          {noHc && (
            <p className="text-xs font-bold text-red-500 w-72">
              Debe ingresar un número de historia clínica
            </p>
          )}
        </div>
      )}
    </>
  );
};
