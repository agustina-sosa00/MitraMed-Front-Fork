import React, { useState } from "react";
import {
  IObjetcPatient,
  SearchPatient,
} from "@/components/features/PanelProfessional/SearchPatient";
import { FormUploadHistory } from "@/components/features/PanelProfessional/FormUploadHistory";
import { TablaDefault } from "@/frontend-resourses/components";

export const MedicalHistory: React.FC = () => {
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

  const handleFindPatient = (hc: string) => {
    setHistory(hc);
    setShowData(!showData);
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
              datosParaTabla: [
                {
                  id: "1",
                  fecha: "08/07/2025",
                  motivo: "Consulta",
                  profesional: "Jean Pietro Mortarini",
                },
                {
                  id: "1",
                  fecha: "08/07/2025",
                  motivo: "Consulta",
                  profesional: "Jean Pietro Mortarini",
                },
                {
                  id: "1",
                  fecha: "08/07/2025",
                  motivo: "Consulta",
                  profesional: "Jean Pietro Mortarini",
                },
                {
                  id: "1",
                  fecha: "08/07/2025",
                  motivo: "Consulta",
                  profesional: "Jean Pietro Mortarini",
                },
                {
                  id: "1",
                  fecha: "08/07/2025",
                  motivo: "Consulta",
                  profesional: "Jean Pietro Mortarini",
                },
                {
                  id: "1",
                  fecha: "08/07/2025",
                  motivo: "Consulta",
                  profesional: "Jean Pietro Mortarini",
                },
              ],
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
        <FormUploadHistory hc={history} />
      </div>
      <div></div>
    </div>
  );
};
