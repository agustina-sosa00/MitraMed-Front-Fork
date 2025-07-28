import React, { useState } from "react";
import {
  IObjetcPatient,
  SearchPatient,
} from "@/components/features/PanelProfessional/SearchPatient";
import { FormUploadHistory } from "@/components/features/PanelProfessional/FormUploadHistory";
import { TablaDefault } from "@/frontend-resourses/components";
import { IArrayTableHistorial } from "@/types/index";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export const MedicalHistory: React.FC = () => {
  // data profesional
  const infoProfessional = Cookies.get("dataProfessional");
  const [showData, setShowData] = useState<boolean>(false);
  const dataPatient: IObjetcPatient[] = [
    {
      label: "apellido",
      value: "Sosa",
    },
    {
      label: "nombre",
      value: "Agustina",
    },
    {
      label: "DNI",
      value: "00234454",
    },
    {
      label: "f. nacimiento",
      value: "05/02/2000",
    },
    {
      label: "edad",
      value: "25",
    },
    {
      label: "obra social",
      value: "OSDE",
    },
  ];
  const [history, setHistory] = useState<string>("");
  const [arrayTableHistorialState, setArrayTableHistorialState] = useState<
    IArrayTableHistorial[]
  >([]);

  const [hc, setHc] = useState<boolean>(false);
  const [focusState, setFocusState] = useState(false);

  // sortedData es un array que acomoda el objeto mas reciente al principio del array
  const sortedData = [...arrayTableHistorialState].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  const handleFindPatient = (hc: string) => {
    if (hc.length === 0) {
      setHc(true);
    } else {
      setHc(false);
      setHistory(hc);
      setShowData(!showData);
    }
  };

  const handleOnFocusInput = () => {
    if (history.length === 0) {
      setFocusState(true);
      Swal.fire({
        icon: "warning",
        title: `Antes de completar , debe ingresar un número de historia clínica`,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#518915",
      });
    } else {
      setFocusState(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen px-6 pt-10 ">
      <div className="flex flex-col w-full ">
        <h1 className="text-2xl font-medium uppercase lg:text-4xl text-green">
          Historial médico
        </h1>
      </div>

      <div className="flex items-center justify-start w-full h-16 gap-1 py-1 ">
        <SearchPatient
          noHc={hc}
          data={dataPatient}
          labelSearch={"HC"}
          showData={showData}
          handleFindPatient={handleFindPatient}
          viewImg={false}
        />
      </div>

      <div className="flex w-full gap-2 ">
        <div className="w-1/2 overflow-x-auto">
          <TablaDefault
            props={{
              datosParaTabla: sortedData,
              objectColumns: [
                {
                  key: "id",
                  label: "id",
                  minWidth: "40",
                  maxWidth: "40",
                },
                {
                  key: "fecha",
                  label: "Fecha",
                  minWidth: "100",
                  maxWidth: "100",
                },
                {
                  key: "motivo",
                  label: "Motivo de consulta",
                  minWidth: "200",
                  maxWidth: "200",
                },

                {
                  key: "profesional",
                  label: "Profesional",
                  minWidth: "160",
                  maxWidth: "160",
                },
              ],
              objectStyles: {
                addHeaderColor: "#022539",
                columnasNumber: [1],
                containerClass: "border border-gray-300 rounded-t-lg ",
                withBorder: false,
              },
            }}
          />
        </div>
        <FormUploadHistory
          handle={handleOnFocusInput}
          infoProfessional={JSON.parse(infoProfessional!)}
          hc={history}
          setState={setArrayTableHistorialState}
          focusState={focusState}
        />
      </div>
      <div></div>
    </div>
  );
};
